import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '../../navigation/types'
import BackButton from '../../components/BackButton'
import WidgetInstallInstructions from '../../components/WidgetsInstallInstructions'
import { useIntroStore } from '../../store/intro'
import { useEffect } from 'react'

const WidgetsSetupInfoScreen = ({
  route,
  navigation
}: RootStackScreenProps<'WidgetsSetupInfo'>) => {
  const widgetsInstructionsModalSeen = useIntroStore(
    state => state.widgetsInstructionsModalSeen
  )
  const setWidgetsInstructionsModalSeen = useIntroStore(
    state => state.setWidgetsInstructionsModalSeen
  )

  useEffect(() => {
    if (!widgetsInstructionsModalSeen) {
      setWidgetsInstructionsModalSeen(true)
    }
  }, [widgetsInstructionsModalSeen, setWidgetsInstructionsModalSeen])

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1">
        <View className="mx-4 h-20">
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <WidgetInstallInstructions />
      </SafeAreaView>
    </View>
  )
}

export default WidgetsSetupInfoScreen
