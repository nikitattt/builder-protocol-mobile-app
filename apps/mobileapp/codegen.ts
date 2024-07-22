import { CodegenConfig } from '@graphql-codegen/cli'
import { PUBLIC_SUBGRAPH_URL } from './src/constants/subgraph'
import { CHAIN_ID } from './src/utils/types'

const config: CodegenConfig = {
  schema: PUBLIC_SUBGRAPH_URL[CHAIN_ID.ETHEREUM],
  documents: ['src/**/*.tsx', 'src/**/*.ts', '!src/gql/**/*'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: []
    }
  }
}

export default config
