import { hasNotch } from 'react-native-device-info'
import { Edges, SafeAreaView } from 'react-native-safe-area-context'

export default function AddSafeAreaView({
  solidStatusBar = false,
  children
}: {
  solidStatusBar?: boolean
  children: React.ReactNode
}) {
  const edges: Edges = hasNotch()
    ? solidStatusBar
      ? []
      : ['top', 'bottom', 'left', 'right']
    : solidStatusBar
    ? ['top', 'bottom', 'left', 'right']
    : []

  const style = solidStatusBar
    ? {
        backgroundColor: 'white'
      }
    : {}

  return (
    <SafeAreaView style={style} edges={edges}>
      {children}
    </SafeAreaView>
  )
}
