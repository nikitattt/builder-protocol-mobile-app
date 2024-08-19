import { Platform } from 'react-native'
import { useUsageStore } from '../store/usage'

export default function useAllowWalletActions() {
  const appActive = useUsageStore(state => state.appActive)

  if (Platform.OS === 'android') {
    return true
  } else if (Platform.OS === 'ios' && appActive >= 5) {
    return true
  } else {
    return false
  }
}
