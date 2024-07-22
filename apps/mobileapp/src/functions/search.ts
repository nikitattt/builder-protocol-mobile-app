import request from 'graphql-request'
import { daoSearchQueryDocument } from '../constants/queries'
import { PUBLIC_SUBGRAPH_URL } from '../constants/subgraph'
import { CHAINS } from '../constants/chains'
import { Dao_Filter } from '../gql/graphql'

export async function search(searchText: string) {
  const where: Dao_Filter =
    searchText.includes('0x') && searchText.length >= 6
      ? {
          tokenAddress_contains: searchText
        }
      : {
          name_contains_nocase: searchText
        }

  const requests = await Promise.all(
    CHAINS.map(async chainId => {
      const data = await request(
        PUBLIC_SUBGRAPH_URL[chainId],
        daoSearchQueryDocument,
        {
          where,
          first: 100
        }
      )

      return { data, chainId }
    })
  )

  const data = requests
    .filter(x => x.data.daos.length > 0)
    .flatMap(x =>
      x.data.daos.map(d => {
        return {
          name: d.name,
          tokenAddress: d.tokenAddress,
          chainId: x.chainId
        }
      })
    )

  return data
}
