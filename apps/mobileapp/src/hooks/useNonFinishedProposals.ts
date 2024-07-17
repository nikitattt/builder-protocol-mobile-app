import { getProposalStatus } from '../utils/proposals'
import { useQueries } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants/queryKeys'
import { SavedDao } from '../store/daos'
import { CACHE_TIMES } from '../constants/cacheTimes'
import { nonFinishedProposals } from '../lib/proposals'

/**
 * Custom hook that retrieves non-finished proposals based on the provided saved DAOs.
 * Non-finished proposals are proposals that are either active, pending, or queued.
 * @param savedDaos - An array of saved DAOs.
 * @returns An object containing the non-finished proposals, loading state, error state, and a refetch function.
 */
export default function useNonFinishedProposals(daos: SavedDao[]) {
  const data = useQueries({
    queries: daos.map(dao => {
      return {
        queryKey: [QUERY_KEYS.PROPOSALS, dao.chainId, dao.address],
        queryFn: async () => nonFinishedProposals(dao.address, dao.chainId),
        staleTime: CACHE_TIMES.PROPOSALS.query,
        gcTime: CACHE_TIMES.PROPOSALS.query
      }
    })
  })

  const isLoading = data?.some(x => x.isPending)
  const isFetching = data?.some(x => x.isFetching)
  const error = data?.some(x => x.error)
  const refetch = () => data?.forEach(x => x.refetch())

  const proposals = data.flatMap(query => {
    if (!query.data?.proposals) return []

    return query.data.proposals.map(prop => {
      return {
        ...prop,
        status: getProposalStatus(prop)
      }
    })
  })

  return { proposals, isLoading, isFetching, error, refetch }
}
