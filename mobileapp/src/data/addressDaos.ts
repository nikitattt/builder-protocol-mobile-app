import { gql } from '@apollo/client'
import zoraClient from './zoraClient'
import { SearchDao } from '../store/daoSearch'
import { DAOS_FOR_ADDRESS_QUERY } from '../constants/queries'

export const loadDaosForAddresses = async (
  addresses: string[]
): Promise<null | SearchDao[]> => {
  const { data } = await zoraClient.query({
    query: DAOS_FOR_ADDRESS_QUERY,
    variables: {
      addresses
    }
  })

  if (!data || !data.nouns || !data.nouns.nounsDaos) {
    return null
  } else {
    return data.nouns.nounsDaos.nodes.map((dao: any) => {
      return {
        address: dao.collectionAddress,
        name: dao.name
      }
    })
  }
}
