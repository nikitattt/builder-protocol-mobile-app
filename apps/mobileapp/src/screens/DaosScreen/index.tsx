import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { HomeTabScreenProps } from '../../navigation/types'
import DaoSearch from '../../components/DaoSearch'
import { useDaoSearchStore } from '../../store/daoSearch'
import DaoCard from '../../components/DaoCard'
import SearchButton from '../../components/SearchButton'
import { useEffect } from 'react'
import { useAddressesStore } from '../../store/addresses'
import React from 'react'
import { IntroNextAction, IntroStage, useIntroStore } from '../../store/intro'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants/queryKeys'
import { FlashList } from '@shopify/flash-list'
import usePrefetchNonFinishedProposals from '../../hooks/usePrefetchNonFinishedProposals'
import useDaosForAddresses from '../../hooks/useDaosForAddresses'
import { hasNotch } from 'react-native-device-info'

const DaosScreen = ({ route, navigation }: HomeTabScreenProps<'Daos'>) => {
  const insets = useSafeAreaInsets()

  const introStage = useIntroStore(state => state.stage)
  const introNextAction = useIntroStore(state => state.nextAction)
  const setIntroNextAction = useIntroStore(state => state.setNextAction)

  const savedDaos = useDaosStore(state => state.saved)
  const saveMultiple = useDaosStore(state => state.saveMultiple)

  const searchDaos = useDaoSearchStore(state => state.searchResults)
  const searchActive = useDaoSearchStore(state => state.active)
  const setSearchActive = useDaoSearchStore(state => state.setActive)
  const setSearchFocusRequested = useDaoSearchStore(
    state => state.setFocusRequested
  )
  const queryClient = useQueryClient()

  const savedManualAddresses = useAddressesStore(state => state.manualAddresses)

  const [refreshing, setRefreshing] = React.useState(false)

  usePrefetchNonFinishedProposals(savedDaos)

  const { daos: daosFromManualAddresses } =
    useDaosForAddresses(savedManualAddresses)

  useEffect(() => {
    if (daosFromManualAddresses) {
      saveMultiple(daosFromManualAddresses)
    }
  }, [daosFromManualAddresses])

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.AUCTION]
    })

    const reloadTime = 600
    setTimeout(() => {
      setRefreshing(false)
    }, reloadTime)
  }, [savedManualAddresses, queryClient, setRefreshing])

  useEffect(() => {
    if (introNextAction === IntroNextAction.SEARCH_DAO) {
      setSearchFocusRequested(true)
      setSearchActive(true)
      setIntroNextAction(IntroNextAction.NONE)
    }
  }, [introNextAction])

  useEffect(() => {
    if (introStage !== IntroStage.DONE) {
      navigation.navigate('Intro')
    }
  }, [introStage, navigation])

  const daos = searchActive && searchDaos.length > 0 ? searchDaos : savedDaos

  return (
    <SafeAreaView
      style={{ backgroundColor: 'white' }}
      edges={hasNotch() ? [] : ['top']}>
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
        <SafeAreaView edges={hasNotch() ? ['top'] : []}>
          <View className="mx-4 mt-6 flex flex-col h-full">
            <View className="mb-3 flex flex-row items-center justify-between">
              <Text className="text-4xl font-extrabold">DAOs</Text>
              <SearchButton />
            </View>
            {searchActive && <DaoSearch />}
            <FlashList
              data={daos}
              estimatedItemSize={50}
              renderItem={({ item }) => (
                <DaoCard
                  key={`${item.name}-${item.chainId}-${item.address}`}
                  dao={item}
                />
              )}
              keyExtractor={item =>
                `${item.name}-${item.chainId}-${item.address}`
              }
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              keyboardShouldPersistTaps="handled"
              ListEmptyComponent={
                <View className="mx-auto mt-[80%] max-w-[160px] text-center">
                  <Text className="max-w-[160px] text-center">
                    Add some DAOs to enable widgets!
                  </Text>
                  <Text className="mt-2 text-center">⌐◨-◨</Text>
                </View>
              }
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DaosScreen
