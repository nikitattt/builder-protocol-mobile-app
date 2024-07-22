import { AddressType } from '../utils/types'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { CACHE_TIMES } from '../constants/cacheTimes'
import { loadDaosForAddresses } from '../functions/loadDaosForAddresses'

export default function useDaosForAddresses(addresses: AddressType[]) {
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.DAOS_FOR_ADDRESSES, addresses],
    queryFn: async () => loadDaosForAddresses(addresses),
    staleTime: CACHE_TIMES.DAOS_FOR_ADDRESSES.query,
    enabled: addresses.length > 0
  })

  const daos = data

  return { daos, isLoading, error }
}
