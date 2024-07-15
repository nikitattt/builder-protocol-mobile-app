import { CHAIN_ID } from '../utils/types'

export const L1_CHAINS = [CHAIN_ID.ETHEREUM]

export const L2_CHAINS = [CHAIN_ID.ZORA, CHAIN_ID.BASE, CHAIN_ID.OPTIMISM]

export const CHAINS = [...L1_CHAINS, ...L2_CHAINS]
