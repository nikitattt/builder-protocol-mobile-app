import { gql } from '@apollo/client'
import { graphql } from '../gql'

export const proposalQueryDocument = graphql(/* GraphQL */ `
  query Proposals($where: Proposal_filter!, $first: Int!) {
    proposals(
      where: $where
      first: $first
      orderBy: timeCreated
      orderDirection: desc
    ) {
      proposalNumber
      proposalId
      title
      voteStart
      voteEnd
      executableFrom
      expiresAt
      executed
      canceled
      abstainVotes
      againstVotes
      forVotes
      quorumVotes
      dao {
        tokenAddress
      }
      votes {
        voter
        support
      }
    }
  }
`)

export const auctionQueryDocument = graphql(/* GraphQL */ `
  query Auction($dao: String!) {
    auctions(
      where: { dao: $dao }
      orderBy: endTime
      orderDirection: desc
      first: 1
    ) {
      token {
        name
        image
        tokenId
      }
      endTime
      highestBid {
        id
        amount
        bidder
      }
    }
  }
`)

export const daoQueryDocument = graphql(/* GraphQL */ `
  query DAO($dao: ID!) {
    dao(id: $dao) {
      treasuryAddress
    }
  }
`)

export const daoSearchQueryDocument = graphql(/* GraphQL */ `
  query SearchDAO($where: DAO_filter!, $first: Int!) {
    daos(where: $where, first: $first) {
      name
      tokenAddress
    }
  }
`)

export const daosForAddressQueryDocument = graphql(/* GraphQL */ `
  query DAOsForAddresses($where: DAOTokenOwner_filter!) {
    daotokenOwners(where: $where) {
      dao {
        name
        tokenAddress
      }
    }
  }
`)

// export const DAOS_FOR_ADDRESS_QUERY = gql`
//   query DAOsForAddresses($where: DAOTokenOwner_filter!) {
//     daotokenOwners(where: $where) {
//       dao {
//         name
//         tokenAddress
//       }
//     }
//   }
// `
