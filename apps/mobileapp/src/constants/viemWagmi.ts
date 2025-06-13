import { http, createConfig, createStorage, noopStorage } from 'wagmi'
import { mainnet, base, zora, optimism } from 'wagmi/chains'

// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { ETH_RPC_URL, BASE_RPC_URL, OP_RPC_URL } from '@env'
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
    [mainnet.id]: fallback([http(ETH_RPC_URL), http()]),
    [base.id]: fallback([http(BASE_RPC_URL), http()]),
    [zora.id]: fallback([http()]),
    [optimism.id]: fallback([http(OP_RPC_URL), http()])
  }
})
