import { AddressType, CHAIN_ID } from '../utils/types'
import request from 'graphql-request'
import { proposalQueryDocument } from '../constants/queries'
import { PUBLIC_SUBGRAPH_URL } from '../constants/subgraph'

export async function nonFinishedProposals(dao: AddressType, chain: CHAIN_ID) {
  return request(PUBLIC_SUBGRAPH_URL[chain], proposalQueryDocument, {
    where: {
      dao_in: [dao],
      executed: false,
      canceled: false
    },
    first: 10
  })
}
