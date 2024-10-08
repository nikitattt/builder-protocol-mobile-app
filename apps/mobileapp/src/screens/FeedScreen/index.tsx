import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { HomeTabScreenProps } from '../../navigation/types'
import React, { useCallback, useState } from 'react'
import ProposalCard from '../../components/ProposalCard'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'
import { filterAndSortProposals } from '../../utils/proposals'
import { isAddressEqual } from 'viem'
import useNonFinishedProposals from '../../hooks/useNonFinishedProposals'
import { FlashList } from '@shopify/flash-list'
import { AddressType } from '../../utils/types'
import { hasNotch } from 'react-native-device-info'
import AppSafeAreaView from '../../components/AppSafeAreaView'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const FeedScreen = ({ route, navigation }: HomeTabScreenProps<'Feed'>) => {
  const insets = useSafeAreaInsets()

  const savedDaos = useDaosStore(state => state.saved)

  const [refreshing, setRefreshing] = useState(false)

  const {
    proposals: props,
    isFetching,
    error,
    refetch
  } = useNonFinishedProposals(savedDaos)

  const onRefresh = useCallback(() => {
    refetch()
    setRefreshing(true)

    const reloadTime = 600
    setTimeout(() => {
      setRefreshing(false)
    }, reloadTime)
  }, [savedDaos])

  const proposals = props && filterAndSortProposals(props)

  const ShimmerBox = (opacity: number = 1) => {
    return (
      <View className="h-20 bg-grey-one/30 rounded-lg">
        <ShimmerPlaceHolder
          duration={2500}
          width={400}
          style={{
            borderRadius: 8,
            width: '100%',
            height: '100%'
          }}
          shimmerWidthPercent={0.5}
          shimmerColors={[
            `rgba(242, 242, 242, ${opacity})`,
            `rgba(231, 231, 231, ${opacity})`,
            `rgba(242, 242, 242, ${opacity})`
          ]}
        />
      </View>
    )
  }

  const haveDaos = savedDaos.length > 0

  return (
    <AppSafeAreaView solidStatusBar>
      <ScrollView
        className="flex flex-col h-full bg-white"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            colors={['#CCCCCC']}
            tintColor={'#CCCCCC'}
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={insets.top}
          />
        }>
        <AppSafeAreaView>
          <View className="mx-4 mt-6 flex flex-col h-full">
            <View className="mb-3 flex flex-row items-center justify-between">
              <Text className="text-4xl font-extrabold">Feed</Text>
            </View>
            {!haveDaos ? (
              <View className="mx-auto mt-[80%] max-w-[160px] text-center">
                <Text className="max-w-[160px] text-center">
                  Add some DAOs to get started!
                </Text>
                <Text className="mt-2 text-center">⌐◨-◨</Text>
              </View>
            ) : isFetching ? (
              <View className="flex flex-col gap-3">
                {ShimmerBox(1)}
                {ShimmerBox(0.2)}
              </View>
            ) : error ? (
              <View className="mx-auto mt-[80%] max-w-[160px] text-center">
                <Text className="max-w-[160px] text-center text-red">
                  Couldn't load proposals
                </Text>
              </View>
            ) : (
              <FlashList
                data={proposals}
                estimatedItemSize={40}
                renderItem={({ item, index }) => (
                  <ProposalCard
                    proposal={item}
                    dao={
                      savedDaos.find(dao =>
                        isAddressEqual(
                          dao.address as AddressType,
                          item.dao.tokenAddress as AddressType
                        )
                      )!
                    }
                    key={`${index}-${item.dao.tokenAddress}-${item.proposalId}`}
                  />
                )}
                keyExtractor={item => item.proposalId}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                keyboardShouldPersistTaps="handled"
                ListEmptyComponent={
                  <View className="mx-auto mt-[80%] max-w-[160px] text-center">
                    <Text className="max-w-[160px] text-center">
                      No active or pending proposals!
                    </Text>
                    <Text className="mt-2 text-center">⌐◨-◨</Text>
                  </View>
                }
              />
            )}
          </View>
        </AppSafeAreaView>
      </ScrollView>
    </AppSafeAreaView>
  )
}

export default FeedScreen
