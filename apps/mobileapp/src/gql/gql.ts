/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query BuilderDAOsProps($where: Proposal_filter!, $first: Int!) {\n    proposals(\n      where: $where\n      first: $first\n      orderBy: timeCreated\n      orderDirection: desc\n    ) {\n      proposalNumber\n      proposalId\n      title\n      voteStart\n      voteEnd\n      executableFrom\n      expiresAt\n      executed\n      canceled\n      abstainVotes\n      againstVotes\n      forVotes\n      quorumVotes\n      dao {\n        tokenAddress\n      }\n      votes {\n        voter\n        support\n      }\n    }\n  }\n": types.BuilderDaOsPropsDocument,
    "\n  query Auction($dao: String!) {\n    auctions(\n      where: { dao: $dao }\n      orderBy: endTime\n      orderDirection: desc\n      first: 1\n    ) {\n      token {\n        name\n        image\n        tokenId\n      }\n      endTime\n      highestBid {\n        id\n        amount\n        bidder\n      }\n    }\n  }\n": types.AuctionDocument,
    "\n  query DAO($dao: ID!) {\n    dao(id: $dao) {\n      treasuryAddress\n    }\n  }\n": types.DaoDocument,
    "\n  query SearchDAO($where: DAO_filter!, $first: Int!) {\n    daos(where: $where, first: $first) {\n      name\n      tokenAddress\n    }\n  }\n": types.SearchDaoDocument,
    "\n  query DAOsForAddresses($where: DAOTokenOwner_filter!) {\n    daotokenOwners(where: $where) {\n      dao {\n        name\n        tokenAddress\n      }\n    }\n  }\n": types.DaOsForAddressesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BuilderDAOsProps($where: Proposal_filter!, $first: Int!) {\n    proposals(\n      where: $where\n      first: $first\n      orderBy: timeCreated\n      orderDirection: desc\n    ) {\n      proposalNumber\n      proposalId\n      title\n      voteStart\n      voteEnd\n      executableFrom\n      expiresAt\n      executed\n      canceled\n      abstainVotes\n      againstVotes\n      forVotes\n      quorumVotes\n      dao {\n        tokenAddress\n      }\n      votes {\n        voter\n        support\n      }\n    }\n  }\n"): (typeof documents)["\n  query BuilderDAOsProps($where: Proposal_filter!, $first: Int!) {\n    proposals(\n      where: $where\n      first: $first\n      orderBy: timeCreated\n      orderDirection: desc\n    ) {\n      proposalNumber\n      proposalId\n      title\n      voteStart\n      voteEnd\n      executableFrom\n      expiresAt\n      executed\n      canceled\n      abstainVotes\n      againstVotes\n      forVotes\n      quorumVotes\n      dao {\n        tokenAddress\n      }\n      votes {\n        voter\n        support\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Auction($dao: String!) {\n    auctions(\n      where: { dao: $dao }\n      orderBy: endTime\n      orderDirection: desc\n      first: 1\n    ) {\n      token {\n        name\n        image\n        tokenId\n      }\n      endTime\n      highestBid {\n        id\n        amount\n        bidder\n      }\n    }\n  }\n"): (typeof documents)["\n  query Auction($dao: String!) {\n    auctions(\n      where: { dao: $dao }\n      orderBy: endTime\n      orderDirection: desc\n      first: 1\n    ) {\n      token {\n        name\n        image\n        tokenId\n      }\n      endTime\n      highestBid {\n        id\n        amount\n        bidder\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DAO($dao: ID!) {\n    dao(id: $dao) {\n      treasuryAddress\n    }\n  }\n"): (typeof documents)["\n  query DAO($dao: ID!) {\n    dao(id: $dao) {\n      treasuryAddress\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchDAO($where: DAO_filter!, $first: Int!) {\n    daos(where: $where, first: $first) {\n      name\n      tokenAddress\n    }\n  }\n"): (typeof documents)["\n  query SearchDAO($where: DAO_filter!, $first: Int!) {\n    daos(where: $where, first: $first) {\n      name\n      tokenAddress\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DAOsForAddresses($where: DAOTokenOwner_filter!) {\n    daotokenOwners(where: $where) {\n      dao {\n        name\n        tokenAddress\n      }\n    }\n  }\n"): (typeof documents)["\n  query DAOsForAddresses($where: DAOTokenOwner_filter!) {\n    daotokenOwners(where: $where) {\n      dao {\n        name\n        tokenAddress\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;