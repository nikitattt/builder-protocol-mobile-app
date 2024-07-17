import { AddressType, CHAIN_ID } from '../utils/types'
import request from 'graphql-request'
import { auctionQueryDocument } from '../constants/queries'
import { PUBLIC_SUBGRAPH_URL } from '../constants/subgraph'

export async function auction(address: AddressType, chain: CHAIN_ID) {
  return request(PUBLIC_SUBGRAPH_URL[chain], auctionQueryDocument, {
    dao: address
  })
}
