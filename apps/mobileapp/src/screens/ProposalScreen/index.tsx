import { RootStackScreenProps } from '../../navigation/types'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { PUBLIC_CHAINS } from '../../constants/chains'
import useAllowWalletActions from '../../hooks/useAllowWalletActions'

const ProposalScreen = ({
  route,
  navigation
}: RootStackScreenProps<'Proposal'>) => {
  const [loading, setLoading] = React.useState(true)
  const allowWalletActions = useAllowWalletActions()

  const proposal = route.params.proposal
  const chainId = route.params.chainId
  const chain = PUBLIC_CHAINS.find(c => c.id === chainId)

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

  const uri = `https://proposals.builderapp.wtf/dao/${chain.slug}/${proposal.dao.tokenAddress}/vote/${proposal.proposalId}?walletActions=${walletActionsStr}`

  return (
    <View className="flex-1">
      <WebView
        source={{ uri: uri }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        className="flex-1 bg-white"
        originWhitelist={['https://*', 'rainbow://*, metamask://*']}
      />
      {loading && (
        <View className="absolute h-full w-full bg-white items-center justify-center">
          <ActivityIndicator className="mb-20" size="small" color="#9D9D9D" />
        </View>
      )}
    </View>
  )
}

export default ProposalScreen
