import { SearchDao } from '../store/daoSearch'
import { daosForAddressQueryDocument } from '../constants/queries'
import { CHAINS } from '../constants/chains'
import request from 'graphql-request'
import { PUBLIC_SUBGRAPH_URL } from '../constants/subgraph'

export const loadDaosForAddresses = async (addresses: string[]) => {
  const requests = await Promise.all(
    CHAINS.map(async chainId => {
      const data = await request(
        PUBLIC_SUBGRAPH_URL[chainId],
        daosForAddressQueryDocument,
        {
          where: { owner_in: addresses }
        }
      )

      return { data, chainId }
    })
  )

  const data = requests
    .filter(x => x.data.daotokenOwners.length > 0)
    .flatMap(x =>
      x.data.daotokenOwners.map(d => {
        return {
          address: d.dao.tokenAddress,
          name: d.dao.name,
          chainId: x.chainId
        }
      })
    )

  return data
}
