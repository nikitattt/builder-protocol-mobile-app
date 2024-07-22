import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import Section from '../Section'
import SolidButton from '../SolidButton'

type WidgetsSectionProps = {
  className?: string
}

const WidgetsSection = ({ className }: WidgetsSectionProps) => {
  const navigation = useNavigation()

  return (
    <Section title="Widgets" className={className}>
      <View className="flex flex-col">
        <Text>Learn how to add and configure widgets for your Dao</Text>
        <SolidButton
          onPress={() => {
            navigation.navigate('WidgetsSetupInfo')
          }}
          text="Adding Widgets"
          icon="arrow-right"
          theme="secondary"
          className="mt-3"
        />
      </View>
    </Section>
  )
}

export default WidgetsSection
