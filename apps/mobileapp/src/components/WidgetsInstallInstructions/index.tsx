import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native'
import Svg, { Path } from 'react-native-svg'

const images = [
  {
    image: require('../../assets/img/widgets/widget_instruction_1.png'),
    text: 'On your Home Screen, press and hold in an empty space.'
  },
  {
    image: require('../../assets/img/widgets/widget_instruction_2.png'),
    text: 'Tap the plus button in the top left.'
  },
  {
    image: require('../../assets/img/widgets/widget_instruction_3.png'),
    text: 'Find Builder DAOs, then choose a widget.'
  },
  {
    image: require('../../assets/img/widgets/widget_instruction_4.png'),
    text: 'Place your widget(s), then press the Done button in the top right.'
  },
  {
    image: require('../../assets/img/widgets/widget_instruction_5.png'),
    text: 'Press and hold the widget, then click “Edit Widget”.'
  },
  {
    image: require('../../assets/img/widgets/widget_instruction_6.png'),
    text: 'Select Dao for this widget and close the window.'
  },
  {
    image: require('../../assets/img/widgets/widget_instruction_7.png'),
    text: 'Done!'
  }
]

const { width } = Dimensions.get('window')

export default function WidgetInstallInstructions() {
  const scrollViewRef = useRef<ScrollView>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x
    const index = Math.round(offsetX / width)

    if (index !== currentIndex) {
      setCurrentIndex(index)
    }
  }

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: index * width, animated: true })
    }
  }

  return (
    <View className="pt-2 pb-4 flex-1">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="">
        {images.map((step, index) => (
          <View
            key={index}
            style={{ width: width }}
            className="justify-center items-center">
            <Image
              source={step.image}
              style={{
                aspectRatio: 1074 / 1224,
                width: '92%',
                height: 'auto'
              }}
              className="object-contain mx-auto"
            />
            <View className="mt-auto mb-8 w-4/5">
              <Text className="text-black text-xl font-bold text-center">
                {step.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row px-4 w-full justify-between items-center">
        <TouchableOpacity
          className="py-2 px-2 bg-grey-one rounded-lg"
          onPress={() => scrollToIndex(currentIndex - 1)}
          disabled={currentIndex === 0}>
          <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={clsx(
              'h-5 w-5 stroke-black',
              currentIndex === 0 ? 'opacity-30' : ''
            )}>
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </Svg>
        </TouchableOpacity>

        <View className="flex-row justify-center items-center">
          {images.map((_, index) => (
            <View
              key={index}
              className={clsx(
                `w-2 h-2 rounded-full mx-1`,
                currentIndex === index ? 'bg-black' : 'bg-grey-one'
              )}
            />
          ))}
        </View>

        <TouchableOpacity
          className="py-2 px-2 bg-grey-one rounded-lg"
          onPress={() => scrollToIndex(currentIndex + 1)}
          disabled={currentIndex === images.length - 1}>
          <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className={clsx(
              'h-5 w-5 stroke-black',
              currentIndex === images.length - 1 ? 'opacity-30' : ''
            )}>
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  )
}
