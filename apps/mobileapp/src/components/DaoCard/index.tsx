import React, { memo } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { SearchDao, useDaoSearchStore } from '../../store/daoSearch'
import { SavedDao } from '../../store/daos'
import Countdown from '../Countdown'
import DaoCardImage from '../DaoCardImage'
import { useNavigation } from '@react-navigation/native'
import { DAO } from '../../utils/types'
import clsx from 'clsx'
import useAuction from '../../hooks/useAuction'
import SaveDaoIconButton from '../SaveDaoIconButton'
import { formatBid } from '../../utils/format'
import useDaoMigrated from '../../hooks/useDaoMigrated'
import { CHAIN_ICON, PUBLIC_CHAINS } from '../../constants/chains'
import AppShimmer from '../AppShimmer'

type DaoCardProps = {
  dao: SavedDao | SearchDao
}

const DaoCard = ({ dao }: DaoCardProps) => {
  const navigation = useNavigation()
  const activeSearch = useDaoSearchStore(state => state.active)

  const { isFetching, isPending, error, auction } = useAuction(
    dao.address,
    dao.chainId
  )
  const { migrated } = useDaoMigrated(dao.address, dao.chainId)

  const openDaoPage = () => {
    const daoData: DAO = {
      name: dao.name,
      address: dao.address,
      chainId: dao.chainId
    }

    navigation.navigate('Dao', {
      dao: daoData
    })
  }

  if (error || !auction)
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={openDaoPage}>
        <View className="relative mb-3 rounded-lg">
          <View className="flex flex-row items-center">
            <View className="bg-grey-one rounded-lg w-36 h-36" />
            <View className="ml-4">
              <Text
                className={clsx(
                  'text-xl font-bold',
                  error && 'text-grey-four'
                )}>
                {error ? `Couldn't load Dao` : dao.name}
              </Text>
              <View className="pt-4 flex flex-col gap-2">
                <Text className={clsx(error && 'text-grey-four')}>
                  {error ? `Try to refresh later` : `No active auction`}
                </Text>
                <View className="bg-grey-one rounded-md h-5 w-20" />
                <View className="bg-grey-one rounded-md h-5 w-16" />
              </View>
            </View>
          </View>
          {activeSearch && <SaveDaoIconButton dao={dao} />}
        </View>
      </TouchableOpacity>
    )

  const highestBid = formatBid(auction?.highestBid?.amount || '0')

  const displayName = auction.token.name
  const bid = `${highestBid} Ξ`

  const chainIcon = CHAIN_ICON[dao.chainId]
  const migratedChainName = PUBLIC_CHAINS.find(
    chain => chain.id === migrated?.chainId
  )?.name

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={openDaoPage}>
      <View className="relative box-border h-36 w-full flex flex-row items-center mb-3 rounded-lg">
        <View className="rounded-lg h-full aspect-square">
          <DaoCardImage image={auction.token.image ?? undefined} />
        </View>
        {migrated ? (
          <View className="ml-4 w-full h-36 flex flex-col flex-shrink">
            <Text className="mt-3 text-xl font-bold flex-shrink leading-6 pr-[26px]">
              {`${dao.name} `}
              <ChainIcon icon={chainIcon} />
            </Text>
            <View className="mt-3">
              <Text className="text-sm text-grey-three">
                This DAO has been migrated to L2.
              </Text>
            </View>
            {activeSearch && migratedChainName ? (
              <View className="mt-3 w-8/12">
                <Text className="text-sm text-grey-three">
                  Save L2 DAO on {migratedChainName} chain.
                </Text>
              </View>
            ) : (
              <View className="mt-3 w-8/12">
                <Text className="text-sm text-grey-three">Update →</Text>
              </View>
            )}
          </View>
        ) : (
          <View className="ml-4 w-full h-36 flex flex-col flex-shrink justify-evenly">
            {isPending ? (
              <Text className="text-xl font-bold flex-shrink leading-6 pr-[26px]">
                {`${dao.name} `}
                <ChainIcon icon={chainIcon} />
              </Text>
            ) : (
              <AppShimmer animating={isFetching}>
                <Text className="text-xl font-bold flex-shrink leading-6 pr-[26px]">
                  {`${displayName} `}
                  <ChainIcon icon={chainIcon} />
                </Text>
              </AppShimmer>
            )}
            <View className="flex flex-col gap-0.5">
              <View>
                <Text className="text-sm text-grey-three">Highest Bid</Text>
                {isPending ? (
                  <View className="bg-grey-one rounded-md h-5 w-16" />
                ) : (
                  <AppShimmer animating={isFetching}>
                    <Text className="text-base font-bold text-black">
                      {bid}
                    </Text>
                  </AppShimmer>
                )}
              </View>
              <View className="">
                <Text className="text-sm text-grey-three">Ends In</Text>
                {isPending ? (
                  <View className="bg-grey-one rounded-md h-5 w-24" />
                ) : (
                  <AppShimmer animating={isFetching}>
                    <Countdown
                      timestamp={auction.endTime}
                      style="text-base font-bold text-black"
                      endText="Ended"
                    />
                  </AppShimmer>
                )}
              </View>
            </View>
          </View>
        )}
        {activeSearch && <SaveDaoIconButton dao={dao} />}
      </View>
    </TouchableOpacity>
  )
}

export default DaoCard

const ChainIcon = memo(function ChainIcon({ icon }: { icon: any }) {
  return (
    <Text className="relative">
      <Image width={20} height={20} className="mt-px h-5 w-5" source={icon} />
    </Text>
  )
})
