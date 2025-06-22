import { RootStackScreenProps } from '../../navigation/types'
import React from 'react'
import { ActivityIndicator, Linking, Platform, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { PUBLIC_CHAINS } from '../../constants/chains'
import useAllowWalletActions from '../../hooks/useAllowWalletActions'

const ProposalsScreen = ({
  route,
  navigation
}: RootStackScreenProps<'Proposals'>) => {
  const [loading, setLoading] = React.useState(true)
  const allowWalletActions = useAllowWalletActions()

  const dao = route.params.dao
  const chain = PUBLIC_CHAINS.find(c => c.id === dao.chainId)

  if (!chain) {
    return (
      <View className="flex-1">
        <View className="absolute h-full w-full bg-white items-center justify-center">
          <Text className="text-black text-center">Error happened:</Text>
          <Text className="text-black text-center">Unsupported DAO.</Text>
        </View>
      </View>
    )
  }

  const walletActionsStr = String(allowWalletActions)

  const uri = allowWalletActions
    ? `https://nouns.build/dao/${chain.slug}/${dao.address}?tab=activity`
    : `https://proposals.builderapp.wtf/dao/${chain.slug}/${dao.address}?tab=activity&auct=false&walletActions=${walletActionsStr}`

  // let uri = `https://proposals.builderapp.wtf/dao/${chain.slug}/${dao.address}?tab=activity&auct=false&walletActions=${walletActionsStr}`

  const injectedJavaScriptOnLoad = `
    if (window.location.href.startsWith('https://nouns.build/dao/')) {
      const selector = 'div.zord-text-heading-sm';
      const maxAttempts = 10;
      let attempt = 0;

      const findAndScroll = () => {
        const elements = document.querySelectorAll(selector);
        const proposalsElement = Array.from(elements).find(
          (el) => el.textContent === 'Proposals'
        );

        if (proposalsElement) {
          proposalsElement.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      const interval = setInterval(() => {
        if (findAndScroll() || attempt >= maxAttempts) {
          clearInterval(interval);
        }
        attempt++;
      }, 500);
    }
    true;
  `

  // Handle custom URL schemes for wallet connections
  const handleShouldStartLoadWithRequest = (request: any) => {
    const { url } = request

    // Check if it's a custom scheme (wallet deep link)
    if (
      url.startsWith('metamask://') ||
      url.startsWith('rainbow://') ||
      url.startsWith('wc://') ||
      url.startsWith('cbwallet://') ||
      url.startsWith('uniswap://') ||
      url.startsWith('zerion://') ||
      url.startsWith('trust://') ||
      url.startsWith('ledgerlive://')
    ) {
      // Open the URL with the system's default handler
      Linking.openURL(url).catch(err => {
        console.error('Failed to open URL:', err)
      })

      // Return false to prevent WebView from loading the URL
      return false
    }

    // Allow all other URLs to load normally
    return true
  }

  return (
    <View className="flex-1">
      <WebView
        source={{ uri: uri }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        className="flex-1 bg-white"
        originWhitelist={[
          'https://*',
          'rainbow://*',
          'metamask://*',
          'wc://*',
          'uniswap://*',
          'zerion://*',
          'trust://*',
          'ledgerlive://*'
        ]}
        androidLayerType="software"
        onShouldStartLoadWithRequest={
          Platform.OS === 'ios' ? handleShouldStartLoadWithRequest : undefined
        }
        // Enable JavaScript and DOM storage for wallet connections
        javaScriptEnabled={true}
        domStorageEnabled={true}
        // Allow third-party cookies for wallet connections
        thirdPartyCookiesEnabled={true}
        // Enable mixed content for better compatibility
        mixedContentMode="compatibility"
        injectedJavaScript={injectedJavaScriptOnLoad}
      />
      {loading && (
        <View className="absolute h-full w-full bg-white items-center justify-center">
          <ActivityIndicator className="mb-20" size="small" color="#9D9D9D" />
        </View>
      )}
    </View>
  )
}

export default ProposalsScreen
