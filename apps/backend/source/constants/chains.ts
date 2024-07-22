import { mainnet, zora, base, optimism } from 'viem/chains'
import { Chain, CHAIN_ID } from '../types/chains'

export const L1_CHAINS = [CHAIN_ID.ETHEREUM]

export const L2_CHAINS = [CHAIN_ID.ZORA, CHAIN_ID.BASE, CHAIN_ID.OPTIMISM]

export const CHAINS = [...L1_CHAINS, ...L2_CHAINS]

export const PUBLIC_CHAINS: Chain[] = [
  {
    ...mainnet,
    id: CHAIN_ID.ETHEREUM,
    slug: 'ethereum',
    icon: 'img/chains/ethereum.png'
  },
  { ...zora, id: CHAIN_ID.ZORA, slug: 'zora', icon: 'img/chains/zora.png' },
  { ...base, id: CHAIN_ID.BASE, slug: 'base', icon: 'img/chains/base.png' },
  {
    ...optimism,
    id: CHAIN_ID.OPTIMISM,
    slug: 'optimism',
    icon: 'img/chains/optimism.png'
  }
]
