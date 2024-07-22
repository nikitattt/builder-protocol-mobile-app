import { Chain as WagmiChain } from 'viem'
import { ProposalsQuery } from '../gql/graphql'

export type DAO = {
  address: AddressType
  name: string
  chainId: CHAIN_ID
}

export type ProposalStatus = {
  status: string
}

export type QueryProposal = ProposalsQuery['proposals'][number]

export type Proposal = QueryProposal & ProposalStatus

export type Vote = {
  voter: string
  support: string
}

export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export const enum CHAIN_ID {
  ETHEREUM = 1,
  SEPOLIA = 11155111,
  OPTIMISM = 10,
  OPTIMISM_SEPOLIA = 11155420,
  BASE = 8453,
  BASE_SEPOLIA = 84532,
  ZORA = 7777777,
  ZORA_SEPOLIA = 999999999,
  FOUNDRY = 31337
}

export interface Chain extends WagmiChain {
  id: CHAIN_ID
  slug: string
  icon: string
}

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`
