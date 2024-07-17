import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { DAO } from '../../utils/types'
import useAuction from '../../hooks/useAuction'
import { formatBid } from '../../utils/format'
import DaoCardImage from '../DaoCardImage'
import Countdown from '../Countdown'
import Bid from '../Bid'
import Shimmer from 'react-native-shimmer'

type ProposalsSectionProps = {
  dao: DAO
  className?: string
}

export default function DaoAuction({ dao, className }: ProposalsSectionProps) {
  const navigation = useNavigation()

  // TODO: display Pending(no data) and error states

  const { isFetching, isPending, error, auction } = useAuction(
    dao.address,
    dao.chainId
  )

  const displayName = auction?.token.name
  const highestBid = formatBid(auction?.highestBid?.amount || '0')
  const bid = `${highestBid} Ξ`

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
      </View>
    </View>
  )
}
