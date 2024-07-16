/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
  /**
   * 8 bytes signed integer
   *
   */
  Int8: { input: any; output: any; }
  /**
   * A string representation of microseconds UNIX timestamp (16 digits)
   *
   */
  Timestamp: { input: any; output: any; }
};

export enum Aggregation_Interval {
  Day = 'day',
  Hour = 'hour'
}

export type Auction = {
  __typename?: 'Auction';
  bidCount: Scalars['Int']['output'];
  bids?: Maybe<Array<AuctionBid>>;
  dao: Dao;
  endTime: Scalars['BigInt']['output'];
  extended: Scalars['Boolean']['output'];
  firstBidTime?: Maybe<Scalars['BigInt']['output']>;
  highestBid?: Maybe<AuctionBid>;
  id: Scalars['ID']['output'];
  settled: Scalars['Boolean']['output'];
  startTime: Scalars['BigInt']['output'];
  token: Token;
  winningBid?: Maybe<AuctionBid>;
};


export type AuctionBidsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionBid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<AuctionBid_Filter>;
};

export type AuctionBid = {
  __typename?: 'AuctionBid';
  amount: Scalars['BigInt']['output'];
  auction: Auction;
  bidTime: Scalars['BigInt']['output'];
  bidder: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
};

export type AuctionBid_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  amount?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  and?: InputMaybe<Array<InputMaybe<AuctionBid_Filter>>>;
  auction?: InputMaybe<Scalars['String']['input']>;
  auction_?: InputMaybe<Auction_Filter>;
  auction_contains?: InputMaybe<Scalars['String']['input']>;
  auction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_ends_with?: InputMaybe<Scalars['String']['input']>;
  auction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_gt?: InputMaybe<Scalars['String']['input']>;
  auction_gte?: InputMaybe<Scalars['String']['input']>;
  auction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auction_lt?: InputMaybe<Scalars['String']['input']>;
  auction_lte?: InputMaybe<Scalars['String']['input']>;
  auction_not?: InputMaybe<Scalars['String']['input']>;
  auction_not_contains?: InputMaybe<Scalars['String']['input']>;
  auction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  auction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  auction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auction_starts_with?: InputMaybe<Scalars['String']['input']>;
  auction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  bidTime?: InputMaybe<Scalars['BigInt']['input']>;
  bidTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  bidTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  bidTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  bidTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  bidTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  bidTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  bidder?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_gt?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_gte?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  bidder_lt?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_lte?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_not?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  bidder_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<AuctionBid_Filter>>>;
};

export enum AuctionBid_OrderBy {
  Amount = 'amount',
  Auction = 'auction',
  AuctionBidCount = 'auction__bidCount',
  AuctionEndTime = 'auction__endTime',
  AuctionExtended = 'auction__extended',
  AuctionFirstBidTime = 'auction__firstBidTime',
  AuctionId = 'auction__id',
  AuctionSettled = 'auction__settled',
  AuctionStartTime = 'auction__startTime',
  BidTime = 'bidTime',
  Bidder = 'bidder',
  Id = 'id'
}

export type AuctionConfig = {
  __typename?: 'AuctionConfig';
  duration: Scalars['BigInt']['output'];
  id: Scalars['ID']['output'];
  minimumBidIncrement: Scalars['BigInt']['output'];
  reservePrice: Scalars['BigInt']['output'];
  timeBuffer: Scalars['BigInt']['output'];
};

export type AuctionConfig_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<AuctionConfig_Filter>>>;
  duration?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_gte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  duration_lt?: InputMaybe<Scalars['BigInt']['input']>;
  duration_lte?: InputMaybe<Scalars['BigInt']['input']>;
  duration_not?: InputMaybe<Scalars['BigInt']['input']>;
  duration_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  minimumBidIncrement?: InputMaybe<Scalars['BigInt']['input']>;
  minimumBidIncrement_gt?: InputMaybe<Scalars['BigInt']['input']>;
  minimumBidIncrement_gte?: InputMaybe<Scalars['BigInt']['input']>;
  minimumBidIncrement_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  minimumBidIncrement_lt?: InputMaybe<Scalars['BigInt']['input']>;
  minimumBidIncrement_lte?: InputMaybe<Scalars['BigInt']['input']>;
  minimumBidIncrement_not?: InputMaybe<Scalars['BigInt']['input']>;
  minimumBidIncrement_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  or?: InputMaybe<Array<InputMaybe<AuctionConfig_Filter>>>;
  reservePrice?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_gt?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_gte?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  reservePrice_lt?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_lte?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_not?: InputMaybe<Scalars['BigInt']['input']>;
  reservePrice_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timeBuffer?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timeBuffer_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_not?: InputMaybe<Scalars['BigInt']['input']>;
  timeBuffer_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum AuctionConfig_OrderBy {
  Duration = 'duration',
  Id = 'id',
  MinimumBidIncrement = 'minimumBidIncrement',
  ReservePrice = 'reservePrice',
  TimeBuffer = 'timeBuffer'
}

export type Auction_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Auction_Filter>>>;
  bidCount?: InputMaybe<Scalars['Int']['input']>;
  bidCount_gt?: InputMaybe<Scalars['Int']['input']>;
  bidCount_gte?: InputMaybe<Scalars['Int']['input']>;
  bidCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  bidCount_lt?: InputMaybe<Scalars['Int']['input']>;
  bidCount_lte?: InputMaybe<Scalars['Int']['input']>;
  bidCount_not?: InputMaybe<Scalars['Int']['input']>;
  bidCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  bids_?: InputMaybe<AuctionBid_Filter>;
  dao?: InputMaybe<Scalars['String']['input']>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']['input']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_ends_with?: InputMaybe<Scalars['String']['input']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_gt?: InputMaybe<Scalars['String']['input']>;
  dao_gte?: InputMaybe<Scalars['String']['input']>;
  dao_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dao_lt?: InputMaybe<Scalars['String']['input']>;
  dao_lte?: InputMaybe<Scalars['String']['input']>;
  dao_not?: InputMaybe<Scalars['String']['input']>;
  dao_not_contains?: InputMaybe<Scalars['String']['input']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_starts_with?: InputMaybe<Scalars['String']['input']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  endTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  extended?: InputMaybe<Scalars['Boolean']['input']>;
  extended_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  extended_not?: InputMaybe<Scalars['Boolean']['input']>;
  extended_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  firstBidTime?: InputMaybe<Scalars['BigInt']['input']>;
  firstBidTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  firstBidTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  firstBidTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  firstBidTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  firstBidTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  firstBidTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  firstBidTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  highestBid?: InputMaybe<Scalars['String']['input']>;
  highestBid_?: InputMaybe<AuctionBid_Filter>;
  highestBid_contains?: InputMaybe<Scalars['String']['input']>;
  highestBid_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  highestBid_ends_with?: InputMaybe<Scalars['String']['input']>;
  highestBid_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  highestBid_gt?: InputMaybe<Scalars['String']['input']>;
  highestBid_gte?: InputMaybe<Scalars['String']['input']>;
  highestBid_in?: InputMaybe<Array<Scalars['String']['input']>>;
  highestBid_lt?: InputMaybe<Scalars['String']['input']>;
  highestBid_lte?: InputMaybe<Scalars['String']['input']>;
  highestBid_not?: InputMaybe<Scalars['String']['input']>;
  highestBid_not_contains?: InputMaybe<Scalars['String']['input']>;
  highestBid_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  highestBid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  highestBid_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  highestBid_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  highestBid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  highestBid_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  highestBid_starts_with?: InputMaybe<Scalars['String']['input']>;
  highestBid_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Auction_Filter>>>;
  settled?: InputMaybe<Scalars['Boolean']['input']>;
  settled_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  settled_not?: InputMaybe<Scalars['Boolean']['input']>;
  settled_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  startTime?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startTime_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not?: InputMaybe<Scalars['BigInt']['input']>;
  startTime_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  token?: InputMaybe<Scalars['String']['input']>;
  token_?: InputMaybe<Token_Filter>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  token_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  token_starts_with?: InputMaybe<Scalars['String']['input']>;
  token_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  winningBid?: InputMaybe<Scalars['String']['input']>;
  winningBid_?: InputMaybe<AuctionBid_Filter>;
  winningBid_contains?: InputMaybe<Scalars['String']['input']>;
  winningBid_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  winningBid_ends_with?: InputMaybe<Scalars['String']['input']>;
  winningBid_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  winningBid_gt?: InputMaybe<Scalars['String']['input']>;
  winningBid_gte?: InputMaybe<Scalars['String']['input']>;
  winningBid_in?: InputMaybe<Array<Scalars['String']['input']>>;
  winningBid_lt?: InputMaybe<Scalars['String']['input']>;
  winningBid_lte?: InputMaybe<Scalars['String']['input']>;
  winningBid_not?: InputMaybe<Scalars['String']['input']>;
  winningBid_not_contains?: InputMaybe<Scalars['String']['input']>;
  winningBid_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  winningBid_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  winningBid_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  winningBid_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  winningBid_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  winningBid_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  winningBid_starts_with?: InputMaybe<Scalars['String']['input']>;
  winningBid_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum Auction_OrderBy {
  BidCount = 'bidCount',
  Bids = 'bids',
  Dao = 'dao',
  DaoAuctionAddress = 'dao__auctionAddress',
  DaoContractImage = 'dao__contractImage',
  DaoDescription = 'dao__description',
  DaoGovernorAddress = 'dao__governorAddress',
  DaoId = 'dao__id',
  DaoMetadataAddress = 'dao__metadataAddress',
  DaoName = 'dao__name',
  DaoOwnerCount = 'dao__ownerCount',
  DaoProjectUri = 'dao__projectURI',
  DaoProposalCount = 'dao__proposalCount',
  DaoSymbol = 'dao__symbol',
  DaoTokenAddress = 'dao__tokenAddress',
  DaoTotalAuctionSales = 'dao__totalAuctionSales',
  DaoTotalSupply = 'dao__totalSupply',
  DaoTreasuryAddress = 'dao__treasuryAddress',
  EndTime = 'endTime',
  Extended = 'extended',
  FirstBidTime = 'firstBidTime',
  HighestBid = 'highestBid',
  HighestBidAmount = 'highestBid__amount',
  HighestBidBidTime = 'highestBid__bidTime',
  HighestBidBidder = 'highestBid__bidder',
  HighestBidId = 'highestBid__id',
  Id = 'id',
  Settled = 'settled',
  StartTime = 'startTime',
  Token = 'token',
  TokenContent = 'token__content',
  TokenId = 'token__id',
  TokenImage = 'token__image',
  TokenMintedAt = 'token__mintedAt',
  TokenName = 'token__name',
  TokenOwner = 'token__owner',
  TokenTokenContract = 'token__tokenContract',
  TokenTokenId = 'token__tokenId',
  WinningBid = 'winningBid',
  WinningBidAmount = 'winningBid__amount',
  WinningBidBidTime = 'winningBid__bidTime',
  WinningBidBidder = 'winningBid__bidder',
  WinningBidId = 'winningBid__id'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
};

export type Dao = {
  __typename?: 'DAO';
  auctionAddress: Scalars['Bytes']['output'];
  auctionConfig: AuctionConfig;
  auctions: Array<Auction>;
  contractImage: Scalars['String']['output'];
  currentAuction?: Maybe<Auction>;
  description: Scalars['String']['output'];
  governorAddress: Scalars['Bytes']['output'];
  id: Scalars['ID']['output'];
  metadataAddress: Scalars['Bytes']['output'];
  metadataProperties?: Maybe<Array<MetadataProperty>>;
  name: Scalars['String']['output'];
  ownerCount: Scalars['Int']['output'];
  owners: Array<DaoTokenOwner>;
  projectURI: Scalars['String']['output'];
  proposalCount: Scalars['Int']['output'];
  proposals: Array<Proposal>;
  symbol: Scalars['String']['output'];
  tokenAddress: Scalars['Bytes']['output'];
  tokens: Array<Token>;
  totalAuctionSales: Scalars['BigInt']['output'];
  totalSupply: Scalars['Int']['output'];
  treasuryAddress: Scalars['Bytes']['output'];
};


export type DaoAuctionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Auction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Auction_Filter>;
};


export type DaoMetadataPropertiesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MetadataProperty_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MetadataProperty_Filter>;
};


export type DaoOwnersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DaoTokenOwner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<DaoTokenOwner_Filter>;
};


export type DaoProposalsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Proposal_Filter>;
};


export type DaoTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Token_Filter>;
};

export type DaoTokenOwner = {
  __typename?: 'DAOTokenOwner';
  dao: Dao;
  daoTokenCount: Scalars['Int']['output'];
  daoTokens: Array<Token>;
  id: Scalars['ID']['output'];
  owner: Scalars['Bytes']['output'];
};


export type DaoTokenOwnerDaoTokensArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<Token_Filter>;
};

export type DaoTokenOwner_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<DaoTokenOwner_Filter>>>;
  dao?: InputMaybe<Scalars['String']['input']>;
  daoTokenCount?: InputMaybe<Scalars['Int']['input']>;
  daoTokenCount_gt?: InputMaybe<Scalars['Int']['input']>;
  daoTokenCount_gte?: InputMaybe<Scalars['Int']['input']>;
  daoTokenCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  daoTokenCount_lt?: InputMaybe<Scalars['Int']['input']>;
  daoTokenCount_lte?: InputMaybe<Scalars['Int']['input']>;
  daoTokenCount_not?: InputMaybe<Scalars['Int']['input']>;
  daoTokenCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  daoTokens_?: InputMaybe<Token_Filter>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']['input']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_ends_with?: InputMaybe<Scalars['String']['input']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_gt?: InputMaybe<Scalars['String']['input']>;
  dao_gte?: InputMaybe<Scalars['String']['input']>;
  dao_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dao_lt?: InputMaybe<Scalars['String']['input']>;
  dao_lte?: InputMaybe<Scalars['String']['input']>;
  dao_not?: InputMaybe<Scalars['String']['input']>;
  dao_not_contains?: InputMaybe<Scalars['String']['input']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_starts_with?: InputMaybe<Scalars['String']['input']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<DaoTokenOwner_Filter>>>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum DaoTokenOwner_OrderBy {
  Dao = 'dao',
  DaoTokenCount = 'daoTokenCount',
  DaoTokens = 'daoTokens',
  DaoAuctionAddress = 'dao__auctionAddress',
  DaoContractImage = 'dao__contractImage',
  DaoDescription = 'dao__description',
  DaoGovernorAddress = 'dao__governorAddress',
  DaoId = 'dao__id',
  DaoMetadataAddress = 'dao__metadataAddress',
  DaoName = 'dao__name',
  DaoOwnerCount = 'dao__ownerCount',
  DaoProjectUri = 'dao__projectURI',
  DaoProposalCount = 'dao__proposalCount',
  DaoSymbol = 'dao__symbol',
  DaoTokenAddress = 'dao__tokenAddress',
  DaoTotalAuctionSales = 'dao__totalAuctionSales',
  DaoTotalSupply = 'dao__totalSupply',
  DaoTreasuryAddress = 'dao__treasuryAddress',
  Id = 'id',
  Owner = 'owner'
}

export type Dao_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Dao_Filter>>>;
  auctionAddress?: InputMaybe<Scalars['Bytes']['input']>;
  auctionAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  auctionAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  auctionAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auctionAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  auctionAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  auctionAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  auctionAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  auctionAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  auctionConfig?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_?: InputMaybe<AuctionConfig_Filter>;
  auctionConfig_contains?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_ends_with?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_gt?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_gte?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auctionConfig_lt?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_lte?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_not?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_not_contains?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  auctionConfig_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_starts_with?: InputMaybe<Scalars['String']['input']>;
  auctionConfig_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  auctions_?: InputMaybe<Auction_Filter>;
  contractImage?: InputMaybe<Scalars['String']['input']>;
  contractImage_contains?: InputMaybe<Scalars['String']['input']>;
  contractImage_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contractImage_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractImage_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contractImage_gt?: InputMaybe<Scalars['String']['input']>;
  contractImage_gte?: InputMaybe<Scalars['String']['input']>;
  contractImage_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contractImage_lt?: InputMaybe<Scalars['String']['input']>;
  contractImage_lte?: InputMaybe<Scalars['String']['input']>;
  contractImage_not?: InputMaybe<Scalars['String']['input']>;
  contractImage_not_contains?: InputMaybe<Scalars['String']['input']>;
  contractImage_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  contractImage_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  contractImage_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contractImage_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  contractImage_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractImage_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  contractImage_starts_with?: InputMaybe<Scalars['String']['input']>;
  contractImage_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentAuction?: InputMaybe<Scalars['String']['input']>;
  currentAuction_?: InputMaybe<Auction_Filter>;
  currentAuction_contains?: InputMaybe<Scalars['String']['input']>;
  currentAuction_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  currentAuction_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentAuction_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentAuction_gt?: InputMaybe<Scalars['String']['input']>;
  currentAuction_gte?: InputMaybe<Scalars['String']['input']>;
  currentAuction_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currentAuction_lt?: InputMaybe<Scalars['String']['input']>;
  currentAuction_lte?: InputMaybe<Scalars['String']['input']>;
  currentAuction_not?: InputMaybe<Scalars['String']['input']>;
  currentAuction_not_contains?: InputMaybe<Scalars['String']['input']>;
  currentAuction_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  currentAuction_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  currentAuction_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentAuction_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  currentAuction_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentAuction_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  currentAuction_starts_with?: InputMaybe<Scalars['String']['input']>;
  currentAuction_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  governorAddress?: InputMaybe<Scalars['Bytes']['input']>;
  governorAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  governorAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  governorAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  governorAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  governorAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  governorAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  governorAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  governorAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  governorAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  metadataAddress?: InputMaybe<Scalars['Bytes']['input']>;
  metadataAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  metadataAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  metadataAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  metadataAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  metadataAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  metadataAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  metadataAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  metadataAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  metadataAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  metadataProperties?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataProperties_?: InputMaybe<MetadataProperty_Filter>;
  metadataProperties_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataProperties_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataProperties_not?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataProperties_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataProperties_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Dao_Filter>>>;
  ownerCount?: InputMaybe<Scalars['Int']['input']>;
  ownerCount_gt?: InputMaybe<Scalars['Int']['input']>;
  ownerCount_gte?: InputMaybe<Scalars['Int']['input']>;
  ownerCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  ownerCount_lt?: InputMaybe<Scalars['Int']['input']>;
  ownerCount_lte?: InputMaybe<Scalars['Int']['input']>;
  ownerCount_not?: InputMaybe<Scalars['Int']['input']>;
  ownerCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  owners_?: InputMaybe<DaoTokenOwner_Filter>;
  projectURI?: InputMaybe<Scalars['String']['input']>;
  projectURI_contains?: InputMaybe<Scalars['String']['input']>;
  projectURI_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  projectURI_ends_with?: InputMaybe<Scalars['String']['input']>;
  projectURI_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  projectURI_gt?: InputMaybe<Scalars['String']['input']>;
  projectURI_gte?: InputMaybe<Scalars['String']['input']>;
  projectURI_in?: InputMaybe<Array<Scalars['String']['input']>>;
  projectURI_lt?: InputMaybe<Scalars['String']['input']>;
  projectURI_lte?: InputMaybe<Scalars['String']['input']>;
  projectURI_not?: InputMaybe<Scalars['String']['input']>;
  projectURI_not_contains?: InputMaybe<Scalars['String']['input']>;
  projectURI_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  projectURI_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  projectURI_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  projectURI_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  projectURI_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  projectURI_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  projectURI_starts_with?: InputMaybe<Scalars['String']['input']>;
  projectURI_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposalCount?: InputMaybe<Scalars['Int']['input']>;
  proposalCount_gt?: InputMaybe<Scalars['Int']['input']>;
  proposalCount_gte?: InputMaybe<Scalars['Int']['input']>;
  proposalCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  proposalCount_lt?: InputMaybe<Scalars['Int']['input']>;
  proposalCount_lte?: InputMaybe<Scalars['Int']['input']>;
  proposalCount_not?: InputMaybe<Scalars['Int']['input']>;
  proposalCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  proposals_?: InputMaybe<Proposal_Filter>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with?: InputMaybe<Scalars['String']['input']>;
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  tokenAddress?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokens_?: InputMaybe<Token_Filter>;
  totalAuctionSales?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctionSales_gt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctionSales_gte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctionSales_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalAuctionSales_lt?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctionSales_lte?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctionSales_not?: InputMaybe<Scalars['BigInt']['input']>;
  totalAuctionSales_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  totalSupply?: InputMaybe<Scalars['Int']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['Int']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['Int']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['Int']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['Int']['input']>;
  totalSupply_not?: InputMaybe<Scalars['Int']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  treasuryAddress?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_contains?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_gt?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_gte?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  treasuryAddress_lt?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_lte?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_not?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  treasuryAddress_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
};

export enum Dao_OrderBy {
  AuctionAddress = 'auctionAddress',
  AuctionConfig = 'auctionConfig',
  AuctionConfigDuration = 'auctionConfig__duration',
  AuctionConfigId = 'auctionConfig__id',
  AuctionConfigMinimumBidIncrement = 'auctionConfig__minimumBidIncrement',
  AuctionConfigReservePrice = 'auctionConfig__reservePrice',
  AuctionConfigTimeBuffer = 'auctionConfig__timeBuffer',
  Auctions = 'auctions',
  ContractImage = 'contractImage',
  CurrentAuction = 'currentAuction',
  CurrentAuctionBidCount = 'currentAuction__bidCount',
  CurrentAuctionEndTime = 'currentAuction__endTime',
  CurrentAuctionExtended = 'currentAuction__extended',
  CurrentAuctionFirstBidTime = 'currentAuction__firstBidTime',
  CurrentAuctionId = 'currentAuction__id',
  CurrentAuctionSettled = 'currentAuction__settled',
  CurrentAuctionStartTime = 'currentAuction__startTime',
  Description = 'description',
  GovernorAddress = 'governorAddress',
  Id = 'id',
  MetadataAddress = 'metadataAddress',
  MetadataProperties = 'metadataProperties',
  Name = 'name',
  OwnerCount = 'ownerCount',
  Owners = 'owners',
  ProjectUri = 'projectURI',
  ProposalCount = 'proposalCount',
  Proposals = 'proposals',
  Symbol = 'symbol',
  TokenAddress = 'tokenAddress',
  Tokens = 'tokens',
  TotalAuctionSales = 'totalAuctionSales',
  TotalSupply = 'totalSupply',
  TreasuryAddress = 'treasuryAddress'
}

export type MetadataItem = {
  __typename?: 'MetadataItem';
  id: Scalars['ID']['output'];
  index: Scalars['Int']['output'];
  isNewProperty: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  propertyId: Scalars['BigInt']['output'];
  propertyInfo: MetadataProperty;
};

export type MetadataItem_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MetadataItem_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  index?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isNewProperty?: InputMaybe<Scalars['Boolean']['input']>;
  isNewProperty_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  isNewProperty_not?: InputMaybe<Scalars['Boolean']['input']>;
  isNewProperty_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<MetadataItem_Filter>>>;
  propertyId?: InputMaybe<Scalars['BigInt']['input']>;
  propertyId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  propertyId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  propertyId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  propertyId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  propertyId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  propertyId_not?: InputMaybe<Scalars['BigInt']['input']>;
  propertyId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  propertyInfo?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_?: InputMaybe<MetadataProperty_Filter>;
  propertyInfo_contains?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_ends_with?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_gt?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_gte?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_in?: InputMaybe<Array<Scalars['String']['input']>>;
  propertyInfo_lt?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_lte?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_not?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_not_contains?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  propertyInfo_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_starts_with?: InputMaybe<Scalars['String']['input']>;
  propertyInfo_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
};

export enum MetadataItem_OrderBy {
  Id = 'id',
  Index = 'index',
  IsNewProperty = 'isNewProperty',
  Name = 'name',
  PropertyId = 'propertyId',
  PropertyInfo = 'propertyInfo',
  PropertyInfoCreatedAt = 'propertyInfo__createdAt',
  PropertyInfoDeleted = 'propertyInfo__deleted',
  PropertyInfoId = 'propertyInfo__id',
  PropertyInfoIpfsBaseUri = 'propertyInfo__ipfsBaseUri',
  PropertyInfoIpfsExtension = 'propertyInfo__ipfsExtension'
}

export type MetadataProperty = {
  __typename?: 'MetadataProperty';
  createdAt: Scalars['BigInt']['output'];
  dao: Dao;
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  ipfsBaseUri: Scalars['String']['output'];
  ipfsExtension: Scalars['String']['output'];
  items: Array<MetadataItem>;
  names: Array<Scalars['String']['output']>;
};


export type MetadataPropertyItemsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MetadataItem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<MetadataItem_Filter>;
};

export type MetadataProperty_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<MetadataProperty_Filter>>>;
  createdAt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  dao?: InputMaybe<Scalars['String']['input']>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']['input']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_ends_with?: InputMaybe<Scalars['String']['input']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_gt?: InputMaybe<Scalars['String']['input']>;
  dao_gte?: InputMaybe<Scalars['String']['input']>;
  dao_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dao_lt?: InputMaybe<Scalars['String']['input']>;
  dao_lte?: InputMaybe<Scalars['String']['input']>;
  dao_not?: InputMaybe<Scalars['String']['input']>;
  dao_not_contains?: InputMaybe<Scalars['String']['input']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_starts_with?: InputMaybe<Scalars['String']['input']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  deleted_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  deleted_not?: InputMaybe<Scalars['Boolean']['input']>;
  deleted_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  ipfsBaseUri?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_contains?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_ends_with?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_gt?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_gte?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ipfsBaseUri_lt?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_lte?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_not?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_not_contains?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ipfsBaseUri_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_starts_with?: InputMaybe<Scalars['String']['input']>;
  ipfsBaseUri_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_contains?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_ends_with?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_gt?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_gte?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ipfsExtension_lt?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_lte?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_not?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_not_contains?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ipfsExtension_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_starts_with?: InputMaybe<Scalars['String']['input']>;
  ipfsExtension_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  items_?: InputMaybe<MetadataItem_Filter>;
  names?: InputMaybe<Array<Scalars['String']['input']>>;
  names_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  names_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  names_not?: InputMaybe<Array<Scalars['String']['input']>>;
  names_not_contains?: InputMaybe<Array<Scalars['String']['input']>>;
  names_not_contains_nocase?: InputMaybe<Array<Scalars['String']['input']>>;
  or?: InputMaybe<Array<InputMaybe<MetadataProperty_Filter>>>;
};

export enum MetadataProperty_OrderBy {
  CreatedAt = 'createdAt',
  Dao = 'dao',
  DaoAuctionAddress = 'dao__auctionAddress',
  DaoContractImage = 'dao__contractImage',
  DaoDescription = 'dao__description',
  DaoGovernorAddress = 'dao__governorAddress',
  DaoId = 'dao__id',
  DaoMetadataAddress = 'dao__metadataAddress',
  DaoName = 'dao__name',
  DaoOwnerCount = 'dao__ownerCount',
  DaoProjectUri = 'dao__projectURI',
  DaoProposalCount = 'dao__proposalCount',
  DaoSymbol = 'dao__symbol',
  DaoTokenAddress = 'dao__tokenAddress',
  DaoTotalAuctionSales = 'dao__totalAuctionSales',
  DaoTotalSupply = 'dao__totalSupply',
  DaoTreasuryAddress = 'dao__treasuryAddress',
  Deleted = 'deleted',
  Id = 'id',
  IpfsBaseUri = 'ipfsBaseUri',
  IpfsExtension = 'ipfsExtension',
  Items = 'items',
  Names = 'names'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Proposal = {
  __typename?: 'Proposal';
  abstainVotes: Scalars['Int']['output'];
  againstVotes: Scalars['Int']['output'];
  calldatas?: Maybe<Scalars['String']['output']>;
  canceled: Scalars['Boolean']['output'];
  dao: Dao;
  description?: Maybe<Scalars['String']['output']>;
  descriptionHash: Scalars['Bytes']['output'];
  executableFrom?: Maybe<Scalars['BigInt']['output']>;
  executed: Scalars['Boolean']['output'];
  expiresAt?: Maybe<Scalars['BigInt']['output']>;
  forVotes: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  proposalId: Scalars['Bytes']['output'];
  proposalNumber: Scalars['Int']['output'];
  proposalThreshold: Scalars['BigInt']['output'];
  proposer: Scalars['Bytes']['output'];
  queued: Scalars['Boolean']['output'];
  quorumVotes: Scalars['BigInt']['output'];
  snapshotBlockNumber: Scalars['BigInt']['output'];
  targets: Array<Scalars['Bytes']['output']>;
  timeCreated: Scalars['BigInt']['output'];
  title?: Maybe<Scalars['String']['output']>;
  transactionHash: Scalars['Bytes']['output'];
  values: Array<Scalars['BigInt']['output']>;
  vetoed: Scalars['Boolean']['output'];
  voteCount: Scalars['Int']['output'];
  voteEnd: Scalars['BigInt']['output'];
  voteStart: Scalars['BigInt']['output'];
  votes: Array<ProposalVote>;
};


export type ProposalVotesArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<ProposalVote_Filter>;
};

export type ProposalVote = {
  __typename?: 'ProposalVote';
  id: Scalars['ID']['output'];
  proposal: Proposal;
  reason?: Maybe<Scalars['String']['output']>;
  support: ProposalVoteSupport;
  voter: Scalars['Bytes']['output'];
  weight: Scalars['Int']['output'];
};

export enum ProposalVoteSupport {
  Abstain = 'ABSTAIN',
  Against = 'AGAINST',
  For = 'FOR'
}

export type ProposalVote_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<ProposalVote_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<ProposalVote_Filter>>>;
  proposal?: InputMaybe<Scalars['String']['input']>;
  proposal_?: InputMaybe<Proposal_Filter>;
  proposal_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_gt?: InputMaybe<Scalars['String']['input']>;
  proposal_gte?: InputMaybe<Scalars['String']['input']>;
  proposal_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_lt?: InputMaybe<Scalars['String']['input']>;
  proposal_lte?: InputMaybe<Scalars['String']['input']>;
  proposal_not?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains?: InputMaybe<Scalars['String']['input']>;
  proposal_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with?: InputMaybe<Scalars['String']['input']>;
  proposal_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  reason_contains?: InputMaybe<Scalars['String']['input']>;
  reason_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_ends_with?: InputMaybe<Scalars['String']['input']>;
  reason_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_gt?: InputMaybe<Scalars['String']['input']>;
  reason_gte?: InputMaybe<Scalars['String']['input']>;
  reason_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reason_lt?: InputMaybe<Scalars['String']['input']>;
  reason_lte?: InputMaybe<Scalars['String']['input']>;
  reason_not?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains?: InputMaybe<Scalars['String']['input']>;
  reason_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  reason_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  reason_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  reason_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  reason_starts_with?: InputMaybe<Scalars['String']['input']>;
  reason_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  support?: InputMaybe<ProposalVoteSupport>;
  support_in?: InputMaybe<Array<ProposalVoteSupport>>;
  support_not?: InputMaybe<ProposalVoteSupport>;
  support_not_in?: InputMaybe<Array<ProposalVoteSupport>>;
  voter?: InputMaybe<Scalars['Bytes']['input']>;
  voter_contains?: InputMaybe<Scalars['Bytes']['input']>;
  voter_gt?: InputMaybe<Scalars['Bytes']['input']>;
  voter_gte?: InputMaybe<Scalars['Bytes']['input']>;
  voter_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  voter_lt?: InputMaybe<Scalars['Bytes']['input']>;
  voter_lte?: InputMaybe<Scalars['Bytes']['input']>;
  voter_not?: InputMaybe<Scalars['Bytes']['input']>;
  voter_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  voter_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  weight?: InputMaybe<Scalars['Int']['input']>;
  weight_gt?: InputMaybe<Scalars['Int']['input']>;
  weight_gte?: InputMaybe<Scalars['Int']['input']>;
  weight_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  weight_lt?: InputMaybe<Scalars['Int']['input']>;
  weight_lte?: InputMaybe<Scalars['Int']['input']>;
  weight_not?: InputMaybe<Scalars['Int']['input']>;
  weight_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum ProposalVote_OrderBy {
  Id = 'id',
  Proposal = 'proposal',
  ProposalAbstainVotes = 'proposal__abstainVotes',
  ProposalAgainstVotes = 'proposal__againstVotes',
  ProposalCalldatas = 'proposal__calldatas',
  ProposalCanceled = 'proposal__canceled',
  ProposalDescription = 'proposal__description',
  ProposalDescriptionHash = 'proposal__descriptionHash',
  ProposalExecutableFrom = 'proposal__executableFrom',
  ProposalExecuted = 'proposal__executed',
  ProposalExpiresAt = 'proposal__expiresAt',
  ProposalForVotes = 'proposal__forVotes',
  ProposalId = 'proposal__id',
  ProposalProposalId = 'proposal__proposalId',
  ProposalProposalNumber = 'proposal__proposalNumber',
  ProposalProposalThreshold = 'proposal__proposalThreshold',
  ProposalProposer = 'proposal__proposer',
  ProposalQueued = 'proposal__queued',
  ProposalQuorumVotes = 'proposal__quorumVotes',
  ProposalSnapshotBlockNumber = 'proposal__snapshotBlockNumber',
  ProposalTimeCreated = 'proposal__timeCreated',
  ProposalTitle = 'proposal__title',
  ProposalTransactionHash = 'proposal__transactionHash',
  ProposalVetoed = 'proposal__vetoed',
  ProposalVoteCount = 'proposal__voteCount',
  ProposalVoteEnd = 'proposal__voteEnd',
  ProposalVoteStart = 'proposal__voteStart',
  Reason = 'reason',
  Support = 'support',
  Voter = 'voter',
  Weight = 'weight'
}

export type Proposal_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  abstainVotes?: InputMaybe<Scalars['Int']['input']>;
  abstainVotes_gt?: InputMaybe<Scalars['Int']['input']>;
  abstainVotes_gte?: InputMaybe<Scalars['Int']['input']>;
  abstainVotes_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  abstainVotes_lt?: InputMaybe<Scalars['Int']['input']>;
  abstainVotes_lte?: InputMaybe<Scalars['Int']['input']>;
  abstainVotes_not?: InputMaybe<Scalars['Int']['input']>;
  abstainVotes_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  againstVotes?: InputMaybe<Scalars['Int']['input']>;
  againstVotes_gt?: InputMaybe<Scalars['Int']['input']>;
  againstVotes_gte?: InputMaybe<Scalars['Int']['input']>;
  againstVotes_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  againstVotes_lt?: InputMaybe<Scalars['Int']['input']>;
  againstVotes_lte?: InputMaybe<Scalars['Int']['input']>;
  againstVotes_not?: InputMaybe<Scalars['Int']['input']>;
  againstVotes_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  and?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
  calldatas?: InputMaybe<Scalars['String']['input']>;
  calldatas_contains?: InputMaybe<Scalars['String']['input']>;
  calldatas_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  calldatas_ends_with?: InputMaybe<Scalars['String']['input']>;
  calldatas_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  calldatas_gt?: InputMaybe<Scalars['String']['input']>;
  calldatas_gte?: InputMaybe<Scalars['String']['input']>;
  calldatas_in?: InputMaybe<Array<Scalars['String']['input']>>;
  calldatas_lt?: InputMaybe<Scalars['String']['input']>;
  calldatas_lte?: InputMaybe<Scalars['String']['input']>;
  calldatas_not?: InputMaybe<Scalars['String']['input']>;
  calldatas_not_contains?: InputMaybe<Scalars['String']['input']>;
  calldatas_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  calldatas_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  calldatas_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  calldatas_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  calldatas_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  calldatas_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  calldatas_starts_with?: InputMaybe<Scalars['String']['input']>;
  calldatas_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  canceled?: InputMaybe<Scalars['Boolean']['input']>;
  canceled_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  canceled_not?: InputMaybe<Scalars['Boolean']['input']>;
  canceled_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  dao?: InputMaybe<Scalars['String']['input']>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']['input']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_ends_with?: InputMaybe<Scalars['String']['input']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_gt?: InputMaybe<Scalars['String']['input']>;
  dao_gte?: InputMaybe<Scalars['String']['input']>;
  dao_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dao_lt?: InputMaybe<Scalars['String']['input']>;
  dao_lte?: InputMaybe<Scalars['String']['input']>;
  dao_not?: InputMaybe<Scalars['String']['input']>;
  dao_not_contains?: InputMaybe<Scalars['String']['input']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_starts_with?: InputMaybe<Scalars['String']['input']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  descriptionHash?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  descriptionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  descriptionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  description_starts_with?: InputMaybe<Scalars['String']['input']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  executableFrom?: InputMaybe<Scalars['BigInt']['input']>;
  executableFrom_gt?: InputMaybe<Scalars['BigInt']['input']>;
  executableFrom_gte?: InputMaybe<Scalars['BigInt']['input']>;
  executableFrom_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executableFrom_lt?: InputMaybe<Scalars['BigInt']['input']>;
  executableFrom_lte?: InputMaybe<Scalars['BigInt']['input']>;
  executableFrom_not?: InputMaybe<Scalars['BigInt']['input']>;
  executableFrom_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  executed?: InputMaybe<Scalars['Boolean']['input']>;
  executed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  executed_not?: InputMaybe<Scalars['Boolean']['input']>;
  executed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  expiresAt?: InputMaybe<Scalars['BigInt']['input']>;
  expiresAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  expiresAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  expiresAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  expiresAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  expiresAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  expiresAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  expiresAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  forVotes?: InputMaybe<Scalars['Int']['input']>;
  forVotes_gt?: InputMaybe<Scalars['Int']['input']>;
  forVotes_gte?: InputMaybe<Scalars['Int']['input']>;
  forVotes_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  forVotes_lt?: InputMaybe<Scalars['Int']['input']>;
  forVotes_lte?: InputMaybe<Scalars['Int']['input']>;
  forVotes_not?: InputMaybe<Scalars['Int']['input']>;
  forVotes_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<Proposal_Filter>>>;
  proposalId?: InputMaybe<Scalars['Bytes']['input']>;
  proposalId_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposalId_gt?: InputMaybe<Scalars['Bytes']['input']>;
  proposalId_gte?: InputMaybe<Scalars['Bytes']['input']>;
  proposalId_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proposalId_lt?: InputMaybe<Scalars['Bytes']['input']>;
  proposalId_lte?: InputMaybe<Scalars['Bytes']['input']>;
  proposalId_not?: InputMaybe<Scalars['Bytes']['input']>;
  proposalId_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposalId_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proposalNumber?: InputMaybe<Scalars['Int']['input']>;
  proposalNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  proposalNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  proposalNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  proposalNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  proposalNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  proposalNumber_not?: InputMaybe<Scalars['Int']['input']>;
  proposalNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  proposalThreshold?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_gt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_gte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposalThreshold_lt?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_lte?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_not?: InputMaybe<Scalars['BigInt']['input']>;
  proposalThreshold_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  proposer?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_gt?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_gte?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  proposer_lt?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_lte?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_not?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  proposer_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  queued?: InputMaybe<Scalars['Boolean']['input']>;
  queued_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  queued_not?: InputMaybe<Scalars['Boolean']['input']>;
  queued_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  quorumVotes?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_gt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_gte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  quorumVotes_lt?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_lte?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_not?: InputMaybe<Scalars['BigInt']['input']>;
  quorumVotes_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  snapshotBlockNumber?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotBlockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotBlockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotBlockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  snapshotBlockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotBlockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotBlockNumber_not?: InputMaybe<Scalars['BigInt']['input']>;
  snapshotBlockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  targets?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not_contains?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  targets_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  timeCreated?: InputMaybe<Scalars['BigInt']['input']>;
  timeCreated_gt?: InputMaybe<Scalars['BigInt']['input']>;
  timeCreated_gte?: InputMaybe<Scalars['BigInt']['input']>;
  timeCreated_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timeCreated_lt?: InputMaybe<Scalars['BigInt']['input']>;
  timeCreated_lte?: InputMaybe<Scalars['BigInt']['input']>;
  timeCreated_not?: InputMaybe<Scalars['BigInt']['input']>;
  timeCreated_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_gt?: InputMaybe<Scalars['String']['input']>;
  title_gte?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_lt?: InputMaybe<Scalars['String']['input']>;
  title_lte?: InputMaybe<Scalars['String']['input']>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  title_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  title_starts_with?: InputMaybe<Scalars['String']['input']>;
  title_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  transactionHash?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  values?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not_contains?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  values_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  vetoed?: InputMaybe<Scalars['Boolean']['input']>;
  vetoed_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  vetoed_not?: InputMaybe<Scalars['Boolean']['input']>;
  vetoed_not_in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  voteCount?: InputMaybe<Scalars['Int']['input']>;
  voteCount_gt?: InputMaybe<Scalars['Int']['input']>;
  voteCount_gte?: InputMaybe<Scalars['Int']['input']>;
  voteCount_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  voteCount_lt?: InputMaybe<Scalars['Int']['input']>;
  voteCount_lte?: InputMaybe<Scalars['Int']['input']>;
  voteCount_not?: InputMaybe<Scalars['Int']['input']>;
  voteCount_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  voteEnd?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_gt?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_gte?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  voteEnd_lt?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_lte?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_not?: InputMaybe<Scalars['BigInt']['input']>;
  voteEnd_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  voteStart?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_gt?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_gte?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  voteStart_lt?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_lte?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_not?: InputMaybe<Scalars['BigInt']['input']>;
  voteStart_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votes_?: InputMaybe<ProposalVote_Filter>;
};

export enum Proposal_OrderBy {
  AbstainVotes = 'abstainVotes',
  AgainstVotes = 'againstVotes',
  Calldatas = 'calldatas',
  Canceled = 'canceled',
  Dao = 'dao',
  DaoAuctionAddress = 'dao__auctionAddress',
  DaoContractImage = 'dao__contractImage',
  DaoDescription = 'dao__description',
  DaoGovernorAddress = 'dao__governorAddress',
  DaoId = 'dao__id',
  DaoMetadataAddress = 'dao__metadataAddress',
  DaoName = 'dao__name',
  DaoOwnerCount = 'dao__ownerCount',
  DaoProjectUri = 'dao__projectURI',
  DaoProposalCount = 'dao__proposalCount',
  DaoSymbol = 'dao__symbol',
  DaoTokenAddress = 'dao__tokenAddress',
  DaoTotalAuctionSales = 'dao__totalAuctionSales',
  DaoTotalSupply = 'dao__totalSupply',
  DaoTreasuryAddress = 'dao__treasuryAddress',
  Description = 'description',
  DescriptionHash = 'descriptionHash',
  ExecutableFrom = 'executableFrom',
  Executed = 'executed',
  ExpiresAt = 'expiresAt',
  ForVotes = 'forVotes',
  Id = 'id',
  ProposalId = 'proposalId',
  ProposalNumber = 'proposalNumber',
  ProposalThreshold = 'proposalThreshold',
  Proposer = 'proposer',
  Queued = 'queued',
  QuorumVotes = 'quorumVotes',
  SnapshotBlockNumber = 'snapshotBlockNumber',
  Targets = 'targets',
  TimeCreated = 'timeCreated',
  Title = 'title',
  TransactionHash = 'transactionHash',
  Values = 'values',
  Vetoed = 'vetoed',
  VoteCount = 'voteCount',
  VoteEnd = 'voteEnd',
  VoteStart = 'voteStart',
  Votes = 'votes'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  auction?: Maybe<Auction>;
  auctionBid?: Maybe<AuctionBid>;
  auctionBids: Array<AuctionBid>;
  auctionConfig?: Maybe<AuctionConfig>;
  auctionConfigs: Array<AuctionConfig>;
  auctions: Array<Auction>;
  dao?: Maybe<Dao>;
  daos: Array<Dao>;
  daotokenOwner?: Maybe<DaoTokenOwner>;
  daotokenOwners: Array<DaoTokenOwner>;
  metadataItem?: Maybe<MetadataItem>;
  metadataItems: Array<MetadataItem>;
  metadataProperties: Array<MetadataProperty>;
  metadataProperty?: Maybe<MetadataProperty>;
  proposal?: Maybe<Proposal>;
  proposalVote?: Maybe<ProposalVote>;
  proposalVotes: Array<ProposalVote>;
  proposals: Array<Proposal>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAuctionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAuctionBidArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAuctionBidsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionBid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AuctionBid_Filter>;
};


export type QueryAuctionConfigArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAuctionConfigsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionConfig_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AuctionConfig_Filter>;
};


export type QueryAuctionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Auction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Auction_Filter>;
};


export type QueryDaoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDaosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Dao_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Dao_Filter>;
};


export type QueryDaotokenOwnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDaotokenOwnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DaoTokenOwner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DaoTokenOwner_Filter>;
};


export type QueryMetadataItemArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryMetadataItemsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MetadataItem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MetadataItem_Filter>;
};


export type QueryMetadataPropertiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MetadataProperty_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MetadataProperty_Filter>;
};


export type QueryMetadataPropertyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVote_Filter>;
};


export type QueryProposalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  auction?: Maybe<Auction>;
  auctionBid?: Maybe<AuctionBid>;
  auctionBids: Array<AuctionBid>;
  auctionConfig?: Maybe<AuctionConfig>;
  auctionConfigs: Array<AuctionConfig>;
  auctions: Array<Auction>;
  dao?: Maybe<Dao>;
  daos: Array<Dao>;
  daotokenOwner?: Maybe<DaoTokenOwner>;
  daotokenOwners: Array<DaoTokenOwner>;
  metadataItem?: Maybe<MetadataItem>;
  metadataItems: Array<MetadataItem>;
  metadataProperties: Array<MetadataProperty>;
  metadataProperty?: Maybe<MetadataProperty>;
  proposal?: Maybe<Proposal>;
  proposalVote?: Maybe<ProposalVote>;
  proposalVotes: Array<ProposalVote>;
  proposals: Array<Proposal>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAuctionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAuctionBidArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAuctionBidsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionBid_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AuctionBid_Filter>;
};


export type SubscriptionAuctionConfigArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAuctionConfigsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<AuctionConfig_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AuctionConfig_Filter>;
};


export type SubscriptionAuctionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Auction_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Auction_Filter>;
};


export type SubscriptionDaoArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDaosArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Dao_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Dao_Filter>;
};


export type SubscriptionDaotokenOwnerArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDaotokenOwnersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<DaoTokenOwner_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DaoTokenOwner_Filter>;
};


export type SubscriptionMetadataItemArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionMetadataItemsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MetadataItem_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MetadataItem_Filter>;
};


export type SubscriptionMetadataPropertiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<MetadataProperty_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<MetadataProperty_Filter>;
};


export type SubscriptionMetadataPropertyArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<ProposalVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVote_Filter>;
};


export type SubscriptionProposalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};

export type Token = {
  __typename?: 'Token';
  auction?: Maybe<Auction>;
  content?: Maybe<Scalars['String']['output']>;
  dao: Dao;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  mintedAt: Scalars['BigInt']['output'];
  name: Scalars['String']['output'];
  owner: Scalars['Bytes']['output'];
  ownerInfo: DaoTokenOwner;
  tokenContract: Scalars['Bytes']['output'];
  tokenId: Scalars['BigInt']['output'];
};

export type Token_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  auction_?: InputMaybe<Auction_Filter>;
  content?: InputMaybe<Scalars['String']['input']>;
  content_contains?: InputMaybe<Scalars['String']['input']>;
  content_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  content_ends_with?: InputMaybe<Scalars['String']['input']>;
  content_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  content_gt?: InputMaybe<Scalars['String']['input']>;
  content_gte?: InputMaybe<Scalars['String']['input']>;
  content_in?: InputMaybe<Array<Scalars['String']['input']>>;
  content_lt?: InputMaybe<Scalars['String']['input']>;
  content_lte?: InputMaybe<Scalars['String']['input']>;
  content_not?: InputMaybe<Scalars['String']['input']>;
  content_not_contains?: InputMaybe<Scalars['String']['input']>;
  content_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  content_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  content_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  content_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  content_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  content_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  content_starts_with?: InputMaybe<Scalars['String']['input']>;
  content_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao?: InputMaybe<Scalars['String']['input']>;
  dao_?: InputMaybe<Dao_Filter>;
  dao_contains?: InputMaybe<Scalars['String']['input']>;
  dao_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_ends_with?: InputMaybe<Scalars['String']['input']>;
  dao_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_gt?: InputMaybe<Scalars['String']['input']>;
  dao_gte?: InputMaybe<Scalars['String']['input']>;
  dao_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dao_lt?: InputMaybe<Scalars['String']['input']>;
  dao_lte?: InputMaybe<Scalars['String']['input']>;
  dao_not?: InputMaybe<Scalars['String']['input']>;
  dao_not_contains?: InputMaybe<Scalars['String']['input']>;
  dao_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  dao_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dao_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  dao_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  dao_starts_with?: InputMaybe<Scalars['String']['input']>;
  dao_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  image?: InputMaybe<Scalars['String']['input']>;
  image_contains?: InputMaybe<Scalars['String']['input']>;
  image_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  image_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_gt?: InputMaybe<Scalars['String']['input']>;
  image_gte?: InputMaybe<Scalars['String']['input']>;
  image_in?: InputMaybe<Array<Scalars['String']['input']>>;
  image_lt?: InputMaybe<Scalars['String']['input']>;
  image_lte?: InputMaybe<Scalars['String']['input']>;
  image_not?: InputMaybe<Scalars['String']['input']>;
  image_not_contains?: InputMaybe<Scalars['String']['input']>;
  image_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  image_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  image_starts_with?: InputMaybe<Scalars['String']['input']>;
  image_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  mintedAt?: InputMaybe<Scalars['BigInt']['input']>;
  mintedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  mintedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  mintedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  mintedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  mintedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  mintedAt_not?: InputMaybe<Scalars['BigInt']['input']>;
  mintedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  name_starts_with?: InputMaybe<Scalars['String']['input']>;
  name_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<InputMaybe<Token_Filter>>>;
  owner?: InputMaybe<Scalars['Bytes']['input']>;
  ownerInfo?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_?: InputMaybe<DaoTokenOwner_Filter>;
  ownerInfo_contains?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_ends_with?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_gt?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_gte?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ownerInfo_lt?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_lte?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_not?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_not_contains?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_not_contains_nocase?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_not_ends_with?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_not_ends_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ownerInfo_not_starts_with?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_not_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_starts_with?: InputMaybe<Scalars['String']['input']>;
  ownerInfo_starts_with_nocase?: InputMaybe<Scalars['String']['input']>;
  owner_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_gte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  owner_lt?: InputMaybe<Scalars['Bytes']['input']>;
  owner_lte?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenContract?: InputMaybe<Scalars['Bytes']['input']>;
  tokenContract_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenContract_gt?: InputMaybe<Scalars['Bytes']['input']>;
  tokenContract_gte?: InputMaybe<Scalars['Bytes']['input']>;
  tokenContract_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenContract_lt?: InputMaybe<Scalars['Bytes']['input']>;
  tokenContract_lte?: InputMaybe<Scalars['Bytes']['input']>;
  tokenContract_not?: InputMaybe<Scalars['Bytes']['input']>;
  tokenContract_not_contains?: InputMaybe<Scalars['Bytes']['input']>;
  tokenContract_not_in?: InputMaybe<Array<Scalars['Bytes']['input']>>;
  tokenId?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not?: InputMaybe<Scalars['BigInt']['input']>;
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum Token_OrderBy {
  Auction = 'auction',
  AuctionBidCount = 'auction__bidCount',
  AuctionEndTime = 'auction__endTime',
  AuctionExtended = 'auction__extended',
  AuctionFirstBidTime = 'auction__firstBidTime',
  AuctionId = 'auction__id',
  AuctionSettled = 'auction__settled',
  AuctionStartTime = 'auction__startTime',
  Content = 'content',
  Dao = 'dao',
  DaoAuctionAddress = 'dao__auctionAddress',
  DaoContractImage = 'dao__contractImage',
  DaoDescription = 'dao__description',
  DaoGovernorAddress = 'dao__governorAddress',
  DaoId = 'dao__id',
  DaoMetadataAddress = 'dao__metadataAddress',
  DaoName = 'dao__name',
  DaoOwnerCount = 'dao__ownerCount',
  DaoProjectUri = 'dao__projectURI',
  DaoProposalCount = 'dao__proposalCount',
  DaoSymbol = 'dao__symbol',
  DaoTokenAddress = 'dao__tokenAddress',
  DaoTotalAuctionSales = 'dao__totalAuctionSales',
  DaoTotalSupply = 'dao__totalSupply',
  DaoTreasuryAddress = 'dao__treasuryAddress',
  Id = 'id',
  Image = 'image',
  MintedAt = 'mintedAt',
  Name = 'name',
  Owner = 'owner',
  OwnerInfo = 'ownerInfo',
  OwnerInfoDaoTokenCount = 'ownerInfo__daoTokenCount',
  OwnerInfoId = 'ownerInfo__id',
  OwnerInfoOwner = 'ownerInfo__owner',
  TokenContract = 'tokenContract',
  TokenId = 'tokenId'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** The hash of the parent block */
  parentHash?: Maybe<Scalars['Bytes']['output']>;
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type BuilderDaOsPropsQueryVariables = Exact<{
  where: Proposal_Filter;
  first: Scalars['Int']['input'];
}>;


export type BuilderDaOsPropsQuery = { __typename?: 'Query', proposals: Array<{ __typename?: 'Proposal', proposalNumber: number, proposalId: any, title?: string | null, voteStart: any, voteEnd: any, executableFrom?: any | null, expiresAt?: any | null, executed: boolean, canceled: boolean, abstainVotes: number, againstVotes: number, forVotes: number, quorumVotes: any, dao: { __typename?: 'DAO', tokenAddress: any }, votes: Array<{ __typename?: 'ProposalVote', voter: any, support: ProposalVoteSupport }> }> };

export type AuctionQueryVariables = Exact<{
  dao: Scalars['String']['input'];
}>;


export type AuctionQuery = { __typename?: 'Query', auctions: Array<{ __typename?: 'Auction', endTime: any, token: { __typename?: 'Token', name: string, image?: string | null, tokenId: any }, highestBid?: { __typename?: 'AuctionBid', id: string, amount: any, bidder: any } | null }> };

export type DaoQueryVariables = Exact<{
  dao: Scalars['ID']['input'];
}>;


export type DaoQuery = { __typename?: 'Query', dao?: { __typename?: 'DAO', treasuryAddress: any } | null };

export type SearchDaoQueryVariables = Exact<{
  where: Dao_Filter;
  first: Scalars['Int']['input'];
}>;


export type SearchDaoQuery = { __typename?: 'Query', daos: Array<{ __typename?: 'DAO', name: string, tokenAddress: any }> };

export type DaOsForAddressesQueryVariables = Exact<{
  where: DaoTokenOwner_Filter;
}>;


export type DaOsForAddressesQuery = { __typename?: 'Query', daotokenOwners: Array<{ __typename?: 'DAOTokenOwner', dao: { __typename?: 'DAO', name: string, tokenAddress: any } }> };


export const BuilderDaOsPropsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BuilderDAOsProps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Proposal_filter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposals"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timeCreated"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"proposalNumber"}},{"kind":"Field","name":{"kind":"Name","value":"proposalId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"voteStart"}},{"kind":"Field","name":{"kind":"Name","value":"voteEnd"}},{"kind":"Field","name":{"kind":"Name","value":"executableFrom"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"executed"}},{"kind":"Field","name":{"kind":"Name","value":"canceled"}},{"kind":"Field","name":{"kind":"Name","value":"abstainVotes"}},{"kind":"Field","name":{"kind":"Name","value":"againstVotes"}},{"kind":"Field","name":{"kind":"Name","value":"forVotes"}},{"kind":"Field","name":{"kind":"Name","value":"quorumVotes"}},{"kind":"Field","name":{"kind":"Name","value":"dao"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"votes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"voter"}},{"kind":"Field","name":{"kind":"Name","value":"support"}}]}}]}}]}}]} as unknown as DocumentNode<BuilderDaOsPropsQuery, BuilderDaOsPropsQueryVariables>;
export const AuctionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Auction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dao"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"auctions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"dao"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dao"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"endTime"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"desc"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"tokenId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"highestBid"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"bidder"}}]}}]}}]}}]} as unknown as DocumentNode<AuctionQuery, AuctionQueryVariables>;
export const DaoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DAO"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dao"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dao"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dao"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"treasuryAddress"}}]}}]}}]} as unknown as DocumentNode<DaoQuery, DaoQueryVariables>;
export const SearchDaoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchDAO"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DAO_filter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"daos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}}]}}]}}]} as unknown as DocumentNode<SearchDaoQuery, SearchDaoQueryVariables>;
export const DaOsForAddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DAOsForAddresses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DAOTokenOwner_filter"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"daotokenOwners"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dao"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}}]}}]}}]}}]} as unknown as DocumentNode<DaOsForAddressesQuery, DaOsForAddressesQueryVariables>;