export const QUERY_KEYS = {
  DAO: 'dao',
  DAO_MIGRATED: 'dao-migrated',
  DYNAMIC: {
    MY_DAOS(str: string) {
      return `my-daos-${str}`
    }
  }
}
