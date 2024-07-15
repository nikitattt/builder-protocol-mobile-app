import { AddressType, CHAIN_ID } from '../utils/types'
import { L2_CHAINS } from '../constants/chains'
import { L2_MIGRATION_DEPLOYER, NULL_ADDRESS } from '../constants/addresses'
import { unpackOptionalArray } from '../utils/helpers'
import { L2DeployerABI } from '../abis/L2MigrationDeployer'
import { readContract, readContracts } from 'wagmi/actions'
import { wagmiConfig } from '../constants/viemWagmi'

export async function daoMigrated(l1Treasury: AddressType) {
  const contracts = L2_CHAINS.map(chainId => {
    const deployer = L2_MIGRATION_DEPLOYER[chainId]

    if (deployer !== NULL_ADDRESS) {
      return {
        address: deployer,
        chainId: chainId,
        abi: L2DeployerABI,
        functionName: 'crossDomainDeployerToMigration',
        args: [l1Treasury]
      }
    }
  })

  const contractCalls = await readContracts(wagmiConfig, {
    contracts: contracts
  })

  const data = contractCalls.map(c => c.status === 'success' && c.result)

  const migrated = data
    .map((x: any, i: any) => {
      const [token] = unpackOptionalArray(x, 3)

      return {
        l2TokenAddress: token,
        chainId: L2_CHAINS[i]
      }
    })
    .find((x: any) => {
      return x.l2TokenAddress !== NULL_ADDRESS && x.l2TokenAddress !== undefined
    })

  if (!migrated) {
    return { migrated: null }
  }

  return {
    migrated: migrated as {
      l2TokenAddress: AddressType
      chainId: number
    }
  }
}
