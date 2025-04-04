# Builder Mobile App

Cross-Platform Framework used: `React-Native`

Currently supported platforms: `iOS`

## Getting started

To build the project on iOS:

1.Make sure you have Xcode and simulator installed

3.Install CocoaPods dependencies

```shell
cd ios/
pod install
```

4.Start app on simulator:

```shell
pnpm start
```

After Metro is loaded, you can start the app with `i`

## Environment variables

Mobile app uses several third party api keys that you need to run the app:

- [posthog](https://posthog.com/) analytics service
- Plus, JSON-RPC provider of choice.

Create `.env` file and add environment variables there:

```
ETH_RPC_URL=https://ethereum.blockpi.network/v1/rpc/...
BASE_RPC_URL=https://base.blockpi.network/v1/rpc/...
OP_RPC_URL=https://optimism.blockpi.network/v1/rpc/...
POSTHOG_TOKEN=phc_...
```

You can check `.env.example` file for a usage example.

> You need to provide the full link of the rpc provider, not just API key.

## Publishing in store

Please follow [official guide](https://reactnative.dev/docs/publishing-to-app-store) on how to publish app in the App Store.
