import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { zustandStorage } from '../storage/zustand'
import { track } from '../utils/track'
import { AddressType } from '../utils/types'

interface AddressesState {
  connectedAddress: AddressType | undefined
  manualAddresses: AddressType[]
  setConnectedAddress: (address: AddressType | undefined) => void
  addManualAddress: (address: AddressType) => void
  removeManualAddress: (address: AddressType) => void
}

export const useAddressesStore = create<AddressesState>()(
  persist(
    (set, get) => ({
      connectedAddress: undefined,
      manualAddresses: [],
      setConnectedAddress: (address: AddressType | undefined) =>
        set({ connectedAddress: address }),
      addManualAddress: (address: AddressType) => {
        const addresses = get().manualAddresses

        if (!addresses.includes(address)) {
          set({ manualAddresses: [...addresses, address] })
          track('Add Wallet Address')
        }
      },
      removeManualAddress: (address: AddressType) =>
        set({
          manualAddresses: get().manualAddresses.filter(
            manualAddress => manualAddress !== address
          )
        })
    }),
    {
      name: 'addresses',
      storage: createJSONStorage(() => zustandStorage)
    }
  )
)
