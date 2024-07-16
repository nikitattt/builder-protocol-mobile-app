import { Chain as WagmiChain } from 'viem'

export type CurrentAuction = {
  token: {
    name: string
    image: string
    tokenId: string
  }
  endTime: number
  highestBid?: {
    amount: string
    bidder: string
  }
}

export type DAO = {
  address: AddressType
  name: string
  auction: CurrentAuction
  chainId: CHAIN_ID
}

export type Proposal = {
  proposalId: string
  proposalNumber: number
  status: string
  title: string
  voteEnd: number
  voteStart: number
  abstainVotes: number
  againstVotes: number
  forVotes: number
  quorumVotes: number
  executableFrom?: number
  expiresAt?: number
  executed: boolean
  canceled: boolean
  votes: Vote[]
  dao: {
    tokenAddress: AddressType
  }
}

export type Vote = {
  voter: string
  support: string
}

export type BuilderDAOsPropsResponse = {
  proposals: Proposal[]
}

export type BuilderDAOsAuctionResponse = {
  auctions: {
    token: {
      name: string
      image: string
      tokenId: string
    }
    endTime: number
    highestBid: {
      amount: string
      bidder: string
    }
  }[]
  auctionConfig: {
    duration: string
  }
}

export type DaoSearchPropsResponse = {
  daos: {
    name: string
    tokenAddress: AddressType
  }[]
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
