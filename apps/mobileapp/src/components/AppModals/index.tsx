import { useEffect, useState } from 'react'
import { Image, Modal, Pressable, Text, View } from 'react-native'
import { useUsageStore } from '../../store/usage'
import SolidButton from '../SolidButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIntroStore } from '../../store/intro'
import { useNavigation } from '@react-navigation/native'

export default function AppModals({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation()

  const numberOfAppOpens = useUsageStore(state => state.appActive)
  const insets = useSafeAreaInsets()

  const widgetsInstructionsModalSeen = useIntroStore(
    state => state.widgetsInstructionsModalSeen
  )
  const setWidgetsInstructionsModalSeen = useIntroStore(
    state => state.setWidgetsInstructionsModalSeen
  )

  const [widgetInstructionsModalVisible, setWidgetInstructionsModalVisible] =
    useState(false)

  const closeAndReset = () => {
    setWidgetInstructionsModalVisible(false)

    if (widgetInstructionsModalVisible) {
      setWidgetsInstructionsModalSeen(true)
    }
  }

  useEffect(() => {
    if (!widgetsInstructionsModalSeen && numberOfAppOpens === 2) {
      setWidgetInstructionsModalVisible(true)
    }
  }, [widgetsInstructionsModalSeen, numberOfAppOpens])

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={widgetInstructionsModalVisible}
        onRequestClose={() => {
          setWidgetInstructionsModalVisible(!widgetInstructionsModalVisible)
        }}>
        <Pressable onPress={closeAndReset}>
          <View className="h-full w-full bg-grey-three/30">
            <View
              className="bg-white rounded-3xl absolute bottom-0 left-4 right-4"
              style={{
                marginBottom: insets.bottom
              }}>
              <View className="flex flex-col p-4">
                <Text className="text-2xl font-bold text-center w-8/12 mx-auto">
                  Have you tried the widgets yet?
                </Text>
                <Image
                  source={require('../../assets/img/widgets/widget_on_screen_example.png')}
                  style={{
                    aspectRatio: 1074 / 1224,
                    width: '100%',
                    height: 'auto'
                  }}
                  className="mt-5 mx-auto"
                />
                <SolidButton
                  onPress={() => {
                    setWidgetInstructionsModalVisible(false)
                    navigation.navigate('WidgetsSetupInfo')
                  }}
                  text="Learn how to add widgets"
                  icon="arrow-right"
                  theme="secondary"
                  className="mt-6"
                />
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
      {children}
    </View>
  )
}
