import { base, mainnet, optimism, zora } from 'wagmi/chains'
import { Chain, CHAIN_ID } from '../utils/types'

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

export const CHAIN_ICON = {
  [CHAIN_ID.ETHEREUM]: require('../assets/img/chains/mainnet.png'),
  [CHAIN_ID.OPTIMISM]: require('../assets/img/chains/optimism.png'),
  [CHAIN_ID.SEPOLIA]: require('../assets/img/chains/mainnet.png'),
  [CHAIN_ID.OPTIMISM_SEPOLIA]: require('../assets/img/chains/optimism.png'),
  [CHAIN_ID.BASE]: require('../assets/img/chains/base.png'),
  [CHAIN_ID.BASE_SEPOLIA]: require('../assets/img/chains/base.png'),
  [CHAIN_ID.ZORA]: require('../assets/img/chains/zora.png'),
  [CHAIN_ID.ZORA_SEPOLIA]: require('../assets/img/chains/zora.png'),
  [CHAIN_ID.FOUNDRY]: require('../assets/img/chains/mainnet.png')
}
