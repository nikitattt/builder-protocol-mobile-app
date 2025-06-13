import { useEffect, useState } from 'react'
import { Image, Modal, Platform, Pressable, Text, View } from 'react-native'
import { useUsageStore } from '../../store/usage'
import SolidButton from '../SolidButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useIntroStore } from '../../store/intro'
import { useNavigation } from '@react-navigation/native'
import { track } from '../../utils/track'
import Svg, { Path } from 'react-native-svg'

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
      track('Widgets Install Info Modal Dismissed')
    }
  }

  useEffect(() => {
    if (
      !widgetsInstructionsModalSeen &&
      numberOfAppOpens === 2 &&
      Platform.OS !== 'android'
    ) {
      setWidgetInstructionsModalVisible(true)
      track('Widgets Install Info Modal Showed')
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
              <View className="absolute top-3 right-3">
                <CloseButton onPress={closeAndReset} />
              </View>
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

function CloseButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View className="bg-grey-one rounded-full p-1">
        <Svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="h-6 w-6 stroke-grey-three">
          <Path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </Svg>
      </View>
    </Pressable>
  )
}
