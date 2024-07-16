export const QUERY_KEYS = {
  DAO: 'dao',
  DAO_MIGRATED: 'dao-migrated',
  DAO_SEARCH: 'dao-search',
  AUCTION: 'auction',
  DYNAMIC: {
    MY_DAOS(str: string) {
      return `my-daos-${str}`
    }
  }
}
