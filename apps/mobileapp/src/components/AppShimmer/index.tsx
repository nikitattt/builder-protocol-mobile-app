import { ReactNode } from 'react'
import { Platform, View } from 'react-native'
import Shimmer from 'react-native-shimmer'

export default function AppShimmer({
  children,
  animating = true,
  className
}: {
  children?: ReactNode
  animating?: boolean
  className?: string
}) {
  if (Platform.OS === 'android') {
    if (animating) {
      return (
        <Shimmer animating={animating} className={className}>
          {children}
        </Shimmer>
      )
    }

    return <View className={className}>{children}</View>
  } else {
    return (
      <Shimmer animating={animating} className={className}>
        {children}
      </Shimmer>
    )
  }
}
