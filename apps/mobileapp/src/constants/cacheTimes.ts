const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_WEEK = ONE_DAY * 7
const INFINITY = Infinity

export const CACHE_TIMES = {
  DAO_NOT_MIGRATED: {
    query: ONE_DAY
  },
  DAO_MIGRATED: {
    query: INFINITY
  },
  DAO: {
    query: ONE_WEEK
  },
  AUCTION: {
    query: ONE_MINUTE * 5
  },
  PROPOSALS: {
    query: ONE_HOUR * 3
  },
  DAOS_FOR_ADDRESSES: {
    query: ONE_DAY
  }
}
