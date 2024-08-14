import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '../../navigation/types'
import BackButton from '../../components/BackButton'
import WidgetInstallInstructions from '../../components/WidgetsInstallInstructions'

const WidgetsSetupInfoScreen = ({
  route,
  navigation
}: RootStackScreenProps<'WidgetsSetupInfo'>) => {
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
