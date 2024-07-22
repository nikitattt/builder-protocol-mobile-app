import { RefreshControl, ScrollView, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDaosStore } from '../../store/daos'
import { RootStackScreenProps } from '../../navigation/types'
import BackButton from '../../components/BackButton'
import DaoProposalsSection from '../../components/DaoProposalsSection'
import Section from '../../components/Section'
import { isAddressEqual } from 'viem'
import { AddressType } from '../../utils/types'
import DaoAuction from '../../components/DaoAuction'
import { useCallback, useState } from 'react'
import { QUERY_KEYS } from '../../constants/queryKeys'
import { useQueryClient } from '@tanstack/react-query'
import OutlineButton from '../../components/OutlineButton'

const DaoScreen = ({ route, navigation }: RootStackScreenProps<'Dao'>) => {
  const { dao } = route.params

  const insets = useSafeAreaInsets()
  const savedDaos = useDaosStore(state => state.saved)
  const removeFromSaved = useDaosStore(state => state.removeFromSaved)
  const save = useDaosStore(state => state.save)
  const queryClient = useQueryClient()

  const [refreshing, setRefreshing] = useState(false)

  const daoIsSaved = savedDaos.some(
    savedDao =>
      isAddressEqual(
        savedDao.address as AddressType,
        dao.address as AddressType
      ) && savedDao.chainId === dao.chainId
  )

  const saveOrUnsave = () => {
    if (daoIsSaved) removeFromSaved(dao.address)
    else save(dao)
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)

    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.AUCTION, dao.chainId, dao.address]
    })
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.PROPOSALS, dao.chainId, dao.address]
    })

    const reloadTime = 600
    setTimeout(() => {
      setRefreshing(false)
    }, reloadTime)
  }, [savedDaos])

  return (
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
      <SafeAreaView>
        <View className="mx-4 h-full">
          <BackButton onPress={() => navigation.goBack()} />
          <DaoAuction dao={dao} />
          <DaoProposalsSection dao={dao} className="mt-8" />
          <Section title="Actions" className="mt-8 mb-4">
            {daoIsSaved ? (
              <OutlineButton
                onPress={saveOrUnsave}
                text="Remove from saved"
                icon="bookmark-slash"
                theme="destructive"
              />
            ) : (
              <OutlineButton
                onPress={saveOrUnsave}
                text="Save"
                icon="bookmark"
                theme="primary"
              />
            )}
          </Section>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default DaoScreen
