import { TouchableOpacity, View, Text } from 'react-native'
import OutlineButtonIcon, { OutlineButtonIconProps } from './OutlineButtonIcon'
import clsx from 'clsx'

export type OutlineButtonTheme = 'primary' | 'secondary' | 'destructive'

export interface OutlineButtonProps {
  className?: string
  onPress?: () => void
  text: string
  icon: OutlineButtonIconProps['icon']
  theme?: OutlineButtonTheme
}

export default function OutlineButton({
  className,
  onPress,
  text,
  icon,
  theme = 'primary'
}: OutlineButtonProps) {
  let borderStyle = 'border-grey-two'
  let textStyle = 'text-black'

  switch (theme) {
    case 'primary':
      borderStyle = 'border-black'
      textStyle = 'text-black'
      break
    case 'secondary':
      borderStyle = 'border-grey-two'
      textStyle = 'text-black'
      break
    case 'destructive':
      borderStyle = 'border-red'
      textStyle = 'text-red'
      break
  }

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      className={className}>
      <View
        className={clsx(
          'h-12 w-full px-4 border rounded-lg items-center justify-between text-center flex flex-row',
          borderStyle
        )}>
        <Text className={clsx(textStyle)}>{text}</Text>
        <OutlineButtonIcon icon={icon} theme={theme} />
      </View>
    </TouchableOpacity>
  )
}
