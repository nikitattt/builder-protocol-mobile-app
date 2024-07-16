import { useQuery } from '@tanstack/react-query'
import { AddressType, CHAIN_ID } from '../utils/types'
import { daoMigrated } from '../lib/migrated'
import { CACHE_TIMES } from '../constants/cacheTimes'
import { dao } from '../lib/dao'
import { QUERY_KEYS } from '../constants/queryKeys'

const getStaleTime = (data: any) => {
  if (data.migrated) {
    return CACHE_TIMES.DAO_MIGRATED.query
  }
  return CACHE_TIMES.DAO_NOT_MIGRATED.query
}

export default function useDaoMigrated(address: AddressType, chain: CHAIN_ID) {
  const enabled = chain === CHAIN_ID.ETHEREUM

  const daoData = useQuery({
    queryKey: [QUERY_KEYS.DAO, chain, address],
    queryFn: async () => dao(address, chain),
    staleTime: CACHE_TIMES.DAO.query,
    enabled: enabled
  })

  const treasuryAddress = daoData.data?.dao?.treasuryAddress

  return useQuery({
    queryKey: [QUERY_KEYS.DAO_MIGRATED, chain, treasuryAddress],
    queryFn: async () => {
      // TODO: check if data is loaded for non mainnet daos
      const data = await daoMigrated(treasuryAddress)
      const staleTime = getStaleTime(data)
      return { data, staleTime }
    },
    staleTime: data => {
      return data.state.data?.staleTime || CACHE_TIMES.DAO_NOT_MIGRATED.query
    },
    enabled: !!treasuryAddress && enabled
  })
}
