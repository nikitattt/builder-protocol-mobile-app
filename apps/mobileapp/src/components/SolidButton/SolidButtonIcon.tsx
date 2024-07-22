import Svg, { Path } from 'react-native-svg'
import { SolidButtonTheme } from '.'
import clsx from 'clsx'

export interface SolidButtonIconProps {
  icon: 'arrow-right' | 'plus'
  theme?: SolidButtonTheme
}

export default function SolidButtonIcon({
  icon,
  theme = 'primary'
}: SolidButtonIconProps) {
  let strokeColor = 'stroke-black'

  switch (theme) {
    case 'primary':
      strokeColor = 'stroke-white'
      break
    case 'secondary':
      strokeColor = 'stroke-black'
      break
  }

  if (icon === 'arrow-right') {
    return (
      <Svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={clsx('w-6 h-6', strokeColor)}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
        />
      </Svg>
    )
  } else if (icon === 'plus') {
    return (
      <Svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={clsx('w-6 h-6', strokeColor)}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </Svg>
    )
  }
}
