import { TouchableOpacity, View, Text } from 'react-native'
import SolidButtonIcon, { SolidButtonIconProps } from './SolidButtonIcon'
import clsx from 'clsx'

export type SolidButtonTheme = 'primary' | 'secondary'

export interface SolidButtonProps {
  className?: string
  onPress?: () => void
  text: string
  icon: SolidButtonIconProps['icon']
  theme?: SolidButtonTheme
}

export default function SolidButton({
  className,
  onPress,
  text,
  icon,
  theme = 'primary'
}: SolidButtonProps) {
  let bgStyle = 'bg-grey-one'
  let textStyle = 'text-black'

  switch (theme) {
    case 'primary':
      bgStyle = 'bg-black'
      textStyle = 'text-white'
      break
    case 'secondary':
      bgStyle = 'bg-grey-one'
      textStyle = 'text-black'
      break
  }

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      className={className}>
      <View
        className={clsx(
          'h-12 w-full px-4 rounded-lg items-center justify-between text-center flex flex-row',
          bgStyle
        )}>
        <Text className={clsx(textStyle)}>{text}</Text>
        <SolidButtonIcon icon={icon} theme={theme} />
      </View>
    </TouchableOpacity>
  )
}
