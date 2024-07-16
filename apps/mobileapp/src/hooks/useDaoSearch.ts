import { useQuery } from '@tanstack/react-query'
import { search } from '../lib/search'
import { QUERY_KEYS } from '../constants/queryKeys'

export default function useDaoSearch(searchText: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.DAO_SEARCH, searchText],
    queryFn: async () => search(searchText),
    enabled: !!searchText,
    gcTime: 0
  })

  return { data, loading: isLoading, error }
}
