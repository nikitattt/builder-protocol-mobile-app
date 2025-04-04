import clsx from 'clsx'
import { Image, Text, View } from 'react-native'
import { useEnsAvatar, useEnsName } from 'wagmi'
import { shortAddress } from '../../utils/address'
import { formatBid } from '../../utils/format'
import { AddressType } from '../../utils/types'
import AppShimmer from '../AppShimmer'

type BidProps = {
  address: string
  bid: string
  className?: string
  isFetching: boolean
}

const Bid = ({ address, bid, className, isFetching }: BidProps) => {
  const { data: ens } = useEnsName({
    address: address as AddressType
  })
  const { data: avatar } = useEnsAvatar({
    name: ens ? String(ens) : undefined
  })

  const noBid = Number(bid) === 0
  const displayName = `${ens ?? shortAddress(address)}`
  const formattedBid = formatBid(bid || '0')
  const displayBid = `${formattedBid} Ξ`
  const displayAvatar = avatar

  return (
    <View
      className={clsx(
        'border border-grey-one px-4 h-12 w-full rounded-lg',
        className
      )}>
      {noBid ? (
        <AppShimmer animating={isFetching} className="my-auto">
          <Text className="my-auto">No bids!</Text>
        </AppShimmer>
      ) : (
        <View className="-ml-1 h-full flex flex-row items-center justify-between">
          <View className="flex flex-row text-center items-center">
            {displayAvatar && (
              <Image
                className="h-6 w-6 mr-1 rounded-full bg-grey-one/60"
                source={{
                  uri: displayAvatar
                }}
              />
            )}
            <AppShimmer animating={isFetching}>
              <Text className="text-black ml-1">{displayName}</Text>
            </AppShimmer>
          </View>
          <AppShimmer animating={isFetching}>
            <Text className="text-black">{displayBid}</Text>
          </AppShimmer>
        </View>
      )}
    </View>
  )
}

export default Bid
