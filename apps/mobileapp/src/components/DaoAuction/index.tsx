import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { DAO } from '../../utils/types'
import useAuction from '../../hooks/useAuction'
import { formatBid } from '../../utils/format'
import DaoCardImage from '../DaoCardImage'
import Countdown from '../Countdown'
import Bid from '../Bid'
import Shimmer from 'react-native-shimmer'
import useDaoMigrated from '../../hooks/useDaoMigrated'
import Svg, { Path } from 'react-native-svg'
import { SavedDao, useDaosStore } from '../../store/daos'
import useAllowWalletActions from '../../hooks/useAllowWalletActions'

type ProposalsSectionProps = {
  dao: DAO
  className?: string
}

export default function DaoAuction({ dao, className }: ProposalsSectionProps) {
  const navigation = useNavigation()
  const allowWalletActions = useAllowWalletActions()

  const removeFromSaved = useDaosStore(state => state.removeFromSaved)
  const save = useDaosStore(state => state.save)

  // TODO: display Pending(no data) and error states

  const { isFetching, isPending, error, auction } = useAuction(
    dao.address,
    dao.chainId
  )
  const { migrated, error: migratedError } = useDaoMigrated(
    dao.address,
    dao.chainId
  )

  const displayName = auction?.token.name
  const highestBid = formatBid(auction?.highestBid?.amount || '0')
  const bid = `${highestBid} Ξ`

  const openBidPage = () => {
    if (auction) {
      navigation.navigate('Bid', {
        dao: dao,
        auctionId: auction.token.tokenId
      })
    }
  }

  const updateToL2Dao = async () => {
    if (migrated) {
      const newDao: SavedDao = {
        name: dao.name,
        address: migrated.l2TokenAddress,
        chainId: migrated.chainId
      }

      await removeFromSaved(dao.address)
      await save(newDao)

      navigation.navigate('Dao', {
        dao: newDao
      })
    }
  }

  return (
    <View className={className}>
      <View className="bg-grey-one rounded-lg w-full aspect-square">
        <DaoCardImage image={auction?.token.image ?? undefined} />
      </View>
      <View className="mt-4">
        <Shimmer animating={isFetching}>
          <Text className="text-3xl font-bold flex-shrink leading-7 pt-2">
            {displayName}
          </Text>
        </Shimmer>
        <View className="mt-3 flex flex-row">
          <View className="w-1/2">
            <Text className="text-grey-three">Highest Bid</Text>
            <Shimmer animating={isFetching}>
              <Text className="text-xl font-bold text-black flex-shrink leading-5 pt-1.5">
                {bid}
              </Text>
            </Shimmer>
          </View>
          <View className="w-1/2 pl-[10%]">
            <Text className="text-grey-three">Ends In</Text>
            <Shimmer animating={isFetching}>
              <Countdown
                timestamp={auction?.endTime}
                style="text-xl font-bold text-black"
                endText="Ended"
              />
            </Shimmer>
          </View>
        </View>
        <Bid
          address={auction?.highestBid?.bidder || ''}
          bid={auction?.highestBid?.amount || '0'}
          className="mt-4"
          isFetching={isFetching}
        />
        {migrated && (
          <View className="mt-6">
            <View className="w-full flex flex-row items-center">
              <Svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                className="w-6 h-6 stroke-black">
                <Path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </Svg>
              <Text className="ml-1 text-base">
                This DAO has been migrated to L2.
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={updateToL2Dao}
              className="mt-4">
              <View className="bg-grey-one border border-grey-one h-12 w-full rounded-lg items-center justify-center">
                <Text className="text-black">Update to migrated L2 DAO</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {allowWalletActions && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={openBidPage}
            className="mt-4">
            <View className="bg-grey-one h-12 w-full rounded-lg items-center justify-center">
              <Text className="text-black">Bid via in-app browser</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
