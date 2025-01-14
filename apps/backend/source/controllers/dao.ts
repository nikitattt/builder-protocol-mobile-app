import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'
import { shortAddress, shortENS } from '../utils/addressAndENSDisplayUtils'
import { getQuery } from '../utils/query'
import {
  createPublicClient,
  fallback,
  formatEther,
  http,
  isAddress
} from 'viem'
import { mainnet } from 'viem/chains'

import { Proposal } from '../types/nouns'
import { loadImageFromUrl } from '../data/images'
import { PUBLIC_CHAINS } from '../constants/chains'
import { PUBLIC_SUBGRAPH_URL } from '../constants/subgraph'

require('dotenv').config()

const ANKR_RPC_URL = process.env.ANKR_RPC_URL
const BLOCKPI_RPC_URL = process.env.BLOCKPI_RPC_URL
const ALCHEMY_RPC_URL = process.env.ALCHEMY_RPC_UR

const getData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const chainFromParams = req.params.chain
    const address = req.params.address
    const dataToLoad = String(req.query.data).split(',') ?? []

    const chain = PUBLIC_CHAINS.find((c) => c.slug === chainFromParams)

    if (!address)
      return res.status(404).json({ message: 'Provide DAO address' })
    if (!isAddress(address))
      return res.status(400).json({ error: 'Incorrect DAO address' })
    if (!chain) return res.status(400).json({ error: 'Incorrect chain' })

    const ankr = http(ANKR_RPC_URL)
    const blockpi = http(BLOCKPI_RPC_URL)
    const alchemy = http(ALCHEMY_RPC_URL)

    const client = createPublicClient({
      chain: mainnet,
      transport: fallback([ankr, blockpi, alchemy])
    })

    const currentTime = Math.floor(Date.now() / 1000)
    const query = getQuery(address, dataToLoad, currentTime)

    const subgraphUrl = PUBLIC_SUBGRAPH_URL[chain.id]

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

        try {
          const ens = await client.getEnsName({
            address: auctionBidder
          })
          bidder = ens ? shortENS(ens) : shortAddress(auctionBidder)
        } catch {
          bidder = shortAddress(auctionBidder)
        }

        amount = auctionAmount
      }

      const pngBuffer = await loadImageFromUrl(auctionData.token.image, 500)

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

    return res.status(200).json(returnData)
  } catch (e) {
    console.error(e)
    return res.status(500).json({ error: 'Error happened during data loading' })
  }
}

export default { getData }
