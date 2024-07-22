import { RootStackScreenProps } from '../../navigation/types'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { WebView } from 'react-native-webview'
import { PUBLIC_CHAINS } from '../../constants/chains'

const BidScreen = ({ route, navigation }: RootStackScreenProps<'Bid'>) => {
  const [loading, setLoading] = React.useState(true)

  const dao = route.params.dao
  const auctionId = route.params.auctionId
  const chain = PUBLIC_CHAINS.find(c => c.id === dao.chainId)

  const uri = `https://nouns.build/dao/${chain?.slug}/${dao.address}/${auctionId}?tab=activity&auct=true&walletActions=true`

  return (
    <View className="flex-1">
      <WebView
        source={{ uri: uri }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        className="flex-1 bg-white"
      />
      {loading && (
        <View className="absolute h-full w-full bg-white items-center justify-center">
          <ActivityIndicator className="mb-20" size="small" color="#9D9D9D" />
        </View>
      )}
    </View>
  )
}

export default BidScreen
