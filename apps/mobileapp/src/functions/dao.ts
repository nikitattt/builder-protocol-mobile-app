import { AddressType, CHAIN_ID } from '../utils/types'
import request from 'graphql-request'
import { daoQueryDocument } from '../constants/queries'
import { PUBLIC_SUBGRAPH_URL } from '../constants/subgraph'

export async function dao(address: AddressType, chain: CHAIN_ID) {
  return request(PUBLIC_SUBGRAPH_URL[chain], daoQueryDocument, { dao: address })
}
