import { AddressType, CHAIN_ID } from '../utils/types'
import { ensureMilliseconds } from '../utils/time'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { auction as auctionFn } from '../functions/auction'
import { CACHE_TIMES } from '../constants/cacheTimes'

export default function useAuction(address: AddressType, chain: CHAIN_ID) {
  const { data, error, isFetching, isPending } = useQuery({
    queryKey: [QUERY_KEYS.AUCTION, chain, address],
    queryFn: async () => auctionFn(address, chain),
    staleTime: CACHE_TIMES.AUCTION.query
  })

  const auction = data?.auctions && data?.auctions[0]

  if (auction) {
    auction.endTime = ensureMilliseconds(auction.endTime)
  }

  return { auction, isFetching, isPending, error }
}
