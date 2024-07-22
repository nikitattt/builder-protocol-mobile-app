import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '../storage/zustand'

interface UsageState {
  appActive: number
  incrementAppActive: () => void
}

export const useUsageStore = create<UsageState>()(
  persist(
    (set, get) => ({
      appActive: 0,
      incrementAppActive: () => set({ appActive: get().appActive + 1 })
    }),
    {
      name: 'usage',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)
