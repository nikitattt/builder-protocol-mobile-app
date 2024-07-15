import { http, createConfig, createStorage, noopStorage } from 'wagmi'
import { mainnet, base, zora, optimism } from 'wagmi/chains'

// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { ANKR_RPC_URL, BLOCKPI_RPC_URL, ALCHEMY_RPC_URL } from '@env'
import { fallback } from 'viem'

// TODO: proper RPC endpoints
export const wagmiConfig = createConfig({
  chains: [mainnet, base, zora, optimism],
  multiInjectedProviderDiscovery: false,
  syncConnectedChain: false,
  storage: createStorage({
    storage: noopStorage
  }),
  transports: {
    [mainnet.id]: fallback([
      http(),
      http(ANKR_RPC_URL),
      http(BLOCKPI_RPC_URL),
      http(ALCHEMY_RPC_URL)
      // http()
    ]),
    [base.id]: fallback([
      http(),
      http(ANKR_RPC_URL),
      http(BLOCKPI_RPC_URL),
      http(ALCHEMY_RPC_URL)
    ]),
    [zora.id]: fallback([http()]),
    [optimism.id]: fallback([
      http(),
      http(ANKR_RPC_URL),
      http(BLOCKPI_RPC_URL),
      http(ALCHEMY_RPC_URL)
    ])
  }
})
