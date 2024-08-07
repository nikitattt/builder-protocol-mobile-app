import { create } from 'zustand'
import { AddressType, CHAIN_ID } from '../utils/types'

export type SearchDao = {
  address: AddressType
  name: string
  chainId: CHAIN_ID
}

export enum DaoSearchStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success'
}

interface DaoSearchState {
  active: boolean
  searchStatus: DaoSearchStatus
  searchResults: SearchDao[]
  focusRequested: boolean
  setActive: (active: boolean) => void
  setSearchStatus: (status: DaoSearchStatus) => void
  setSearchResults: (results: SearchDao[]) => void
  clearSearchResults: () => void
  setFocusRequested: (focusRequested: boolean) => void
  addToSearchResults: (results: SearchDao[]) => void
}

export const useDaoSearchStore = create<DaoSearchState>()((set, get) => ({
  active: false,
  searchStatus: DaoSearchStatus.IDLE,
  searchResults: [],
  focusRequested: false,
  setActive: (active: boolean) => {
    if (active) {
      set({ active })
    } else {
      set({ active, searchStatus: DaoSearchStatus.IDLE, searchResults: [] })
    }
  },
  setSearchStatus: (status: DaoSearchStatus) => {
    set({ searchStatus: status })
  },
  setSearchResults: (results: SearchDao[]) => {
    set({ searchResults: results })
  },
  addToSearchResults: (results: SearchDao[]) => {
    set({ searchResults: [...results, ...get().searchResults] })
  },
  clearSearchResults: () => {
    set({ searchResults: [] })
  },
  setFocusRequested: (focusRequested: boolean) => {
    set({ focusRequested })
  }
}))
