import { Linking, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '../../navigation/types'
import BackButton from '../../components/BackButton'
import Section from '../../components/Section'
import { track } from '../../utils/track'
import OutlineButton from '../../components/OutlineButton'
import WidgetInstallInstructions from '../../components/WidgetsInstallInstructions'

const appleVideoGuideUrl = 'https://www.youtube.com/watch?v=x49NAAOQyRA'

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
        {/* <Section title="Adding Widgets">
            <Text className="text-base mb-3">
              Here are the steps to add widgets to your Home screen:
            </Text>
            <Text className="text-base mb-2">
              1. Touch and hold an empty area on your Home Screen.
            </Text>
            <Text className="text-base mb-2">
              2. Tap the plus icon (+) on the top left corner.
            </Text>
            <Text className="text-base mb-2">
              3. Scroll down and select Builder app from the list.
            </Text>
            <Text className="text-base mb-2">
              4. Choose the widget and tap Add Widget.
            </Text>
            <Text className="text-base mb-2">
              5. Right after adding the widget, tap on it to customize and
              select Dao for this widget.
            </Text>
            <Text className="text-base mb-2">
              6. Tap Done to save your settings.
            </Text>
          </Section> */}
        {/* <Section title="Video" className="mt-6">
            <OutlineButton
              onPress={async () => {
                track('Watch Apple Widgets Guide')
                if (await Linking.canOpenURL(appleVideoGuideUrl)) {
                  await Linking.openURL(appleVideoGuideUrl)
                }
              }}
              text="Guide from Apple Support"
              icon="arrow-up-right"
              theme="secondary"
            />
          </Section> */}
      </SafeAreaView>
    </View>
  )
}

export default WidgetsSetupInfoScreen
