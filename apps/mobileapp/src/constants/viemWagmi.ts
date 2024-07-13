// import {
//   WagmiConfig,
//   createConfig,
//   configureChains,
//   mainnet,
//   createStorage
// } from 'wagmi'
// import { publicProvider } from 'wagmi/providers/public'
// import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'

// // @ts-expect-error - `@env` is a virtualised module via Babel config.
// import { ANKR_RPC_URL, BLOCKPI_RPC_URL, ALCHEMY_RPC_URL } from '@env'

// export const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet],
//   [
//     jsonRpcProvider({
//       rpc: chain => ({
//         http: ANKR_RPC_URL
//       })
//     }),
//     jsonRpcProvider({
//       rpc: chain => ({
//         http: BLOCKPI_RPC_URL
//       })
//     }),
//     jsonRpcProvider({
//       rpc: chain => ({
//         http: ALCHEMY_RPC_URL
//       })
//     }),
//     publicProvider()
//   ]
// )

// export const wagmiConfig = createConfig({
//   // storage: createStorage({ storage: noopStorage }),
//   autoConnect: false,
//   publicClient,
//   webSocketPublicClient
// })

import { http, createConfig, createStorage, noopStorage } from 'wagmi'
import { mainnet, base, zora, optimism } from 'wagmi/chains'

// @ts-expect-error - `@env` is a virtualised module via Babel config.
import { ANKR_RPC_URL, BLOCKPI_RPC_URL, ALCHEMY_RPC_URL } from '@env'
import { fallback } from 'viem'

export const wagmiConfig = createConfig({
  chains: [mainnet, base, zora, optimism],
  multiInjectedProviderDiscovery: false,
  syncConnectedChain: false,
  storage: createStorage({
    storage: noopStorage
  }),
  transports: {
    [mainnet.id]: fallback([
      http(ANKR_RPC_URL),
      http(BLOCKPI_RPC_URL),
      http(ALCHEMY_RPC_URL),
      http()
    ]),
    [base.id]: fallback([
      http(ANKR_RPC_URL),
      http(BLOCKPI_RPC_URL),
      http(ALCHEMY_RPC_URL),
      http()
    ]),
    [zora.id]: fallback([http()]),
    [optimism.id]: fallback([
      http(ANKR_RPC_URL),
      http(BLOCKPI_RPC_URL),
      http(ALCHEMY_RPC_URL),
      http()
    ])
  }
})
