type AppConfig = {
  graphUrl: string
  imageEndpoint: string
  daosAppGroup: string
}

const app: AppConfig = {
  graphUrl:
    'https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-ethereum-mainnet/stable/gn',
  // 'https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-base-mainnet/stable/gn',
  imageEndpoint: 'https://api.builderapp.wtf/image',
  daosAppGroup: 'group.com.nouns.ng.builder.daos'
}

const config = {
  app: app
}

export default config
