import Svg, { Path } from 'react-native-svg'
import { OutlineButtonTheme } from '.'
import clsx from 'clsx'

export interface OutlineButtonIconProps {
  icon: 'arrow-up-right' | 'bookmark-slash' | 'bookmark'
  theme?: OutlineButtonTheme
}

export default function OutlineButtonIcon({
  icon,
  theme = 'primary'
}: OutlineButtonIconProps) {
  let strokeColor = 'stroke-black'

  switch (theme) {
    case 'primary':
      strokeColor = 'stroke-black'
      break
    case 'secondary':
      strokeColor = 'stroke-grey-four'
      break
    case 'destructive':
      strokeColor = 'stroke-red'
      break
  }

  if (icon === 'bookmark-slash') {
    return (
      <Svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={clsx('w-6 h-6', strokeColor)}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
        />
      </Svg>
    )
  } else if (icon === 'bookmark') {
    return (
      <Svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={clsx('w-6 h-6', strokeColor)}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
        />
      </Svg>
    )
  } else if (icon === 'arrow-up-right') {
    return (
      <Svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className={clsx('w-6 h-6', strokeColor)}>
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </Svg>
    )
  }
}
