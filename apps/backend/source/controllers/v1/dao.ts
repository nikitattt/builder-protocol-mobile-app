import axios, { AxiosResponse } from 'axios'
import {
  createPublicClient,
  fallback,
  formatEther,
  http,
  isAddress,
  isAddressEqual
} from 'viem'
import { mainnet } from 'viem/chains'
import config from '../../config'
import { loadImage, loadImageFromUrl } from '../../data/images'
import { Proposal } from '../../types/nouns'
import { shortENS, shortAddress } from '../../utils/addressAndENSDisplayUtils'
import { getQuery } from '../../utils/query'
import { PUBLIC_SUBGRAPH_URL } from '../../constants/subgraph'
import { CHAIN_ID } from '../../types/chains'
import { BunRequest } from 'bun'

const { addresses } = config

const ANKR_RPC_URL = process.env.ANKR_RPC_URL
const BLOCKPI_RPC_URL = process.env.BLOCKPI_RPC_URL
const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_UR

const getData = async (req: BunRequest<'/dao/:slug'>) => {
  try {
    const address = req.params.slug
    const searchParams = new URL(req.url).searchParams
    const dataToLoad = searchParams.get('data')?.split(',') ?? []

    if (!address)
      return Response.json(
        { message: 'Provide DAO address' },
        {
          status: 404
        }
      )
    if (!isAddress(address))
      return Response.json(
        { error: 'Incorrect DAO address' },
        {
          status: 400
        }
      )

    const ankr = http(ANKR_RPC_URL)
    const blockpi = http(BLOCKPI_RPC_URL)
    const alchemy = http(ALCHEMY_RPC_URL)

    const client = createPublicClient({
      chain: mainnet,
      transport: fallback([ankr, blockpi, alchemy])
    })

    const currentTime = Math.floor(Date.now() / 1000)
    const query = getQuery(address, dataToLoad, currentTime)

    const subgraphUrl = PUBLIC_SUBGRAPH_URL[CHAIN_ID.ETHEREUM]

    let result: AxiosResponse = await axios.post(subgraphUrl, {
      query: query
    })
    const data = result.data.data

    const daoData = data.dao

    let returnData: { [k: string]: any } = {
      dao: {
        name: daoData.name
      }
    }

    if (dataToLoad.includes('auction')) {
      const auctionData = data.auctions[0]

      let bidder = '-'
      let amount = '0'

      if (auctionData?.highestBid) {
        const auctionBidder = auctionData.highestBid.bidder
        const auctionAmount = formatEther(auctionData.highestBid.amount)

        const ens = await client.getEnsName({
          address: auctionBidder
        })
        bidder = ens ? shortENS(ens) : shortAddress(auctionBidder)

        amount = auctionAmount
      }

      const isNounsContract =
        isAddressEqual(address, addresses.lilNounsToken) ||
        isAddressEqual(address, addresses.nounsToken)

      const pngBuffer = isNounsContract
        ? await loadImage(client, address, auctionData.tokenId, 500)
        : await loadImageFromUrl(auctionData.token.image, 500)

      const image = pngBuffer.toString('base64')

      const duration = Number(data.auctionConfig.duration)

      returnData.auction = {
        id: Number(auctionData.token.tokenId),
        bidder: bidder,
        amount: Number(amount),
        endTime: Number(auctionData.endTime),
        duration: duration,
        image: image
      }
    }
    if (dataToLoad.includes('governance')) {
      const governanceData = data.proposals

      const proposals = Array<Proposal>()

      for (const prop of governanceData) {
        const state =
          prop.voteStart > currentTime
            ? 'PENDING'
            : prop.voteStart <= currentTime && prop.voteEnd > currentTime
            ? 'ACTIVE'
            : 'PASSED'

        if (state === 'ACTIVE' || state === 'PENDING') {
          const endTime = Number(
            state === 'ACTIVE' ? prop.voteEnd : prop.voteStart
          )

          let propToAdd: Proposal = {
            id: prop.proposalId,
            number: Number(prop.proposalNumber),
            title: prop.title,
            state: state,
            endTime: endTime,
            quorum: Number(prop.quorumVotes)
          }

          if (state === 'ACTIVE') {
            propToAdd.votes = {
              yes: prop.forVotes,
              no: prop.againstVotes,
              abstain: prop.abstainVotes
            }
          }

          proposals.push(propToAdd)
        }
      }

      returnData.governance = {
        proposals: proposals
      }
    }

    return Response.json(returnData, {
      status: 200
    })
  } catch (e) {
    console.error(e)
    return Response.json(
      { error: 'Error happened during data loading' },
      { status: 500 }
    )
  }
}

export default { getData }
