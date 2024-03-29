import { Image, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackScreenProps } from '../../navigation/types'
import { IntroNextAction, IntroStage, useIntroStore } from '../../store/intro'
import { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'

const Dots = ({
  numberOfDots,
  currentIndex
}: {
  numberOfDots: number
  currentIndex: number
}) => {
  const dots = [...Array(numberOfDots).keys()]

  return (
    <View className="flex flex-row gap-2 items-center justify-center">
      {dots.map((dot, index) => (
        <View
          key={index}
          className={`rounded-full ${
            index === currentIndex
              ? 'h-2 w-2 bg-black'
              : 'h-1.5 w-1.5 bg-grey-two'
          }`}
        />
      ))}
    </View>
  )
}

const IntroScreen = ({ route, navigation }: RootStackScreenProps<'Intro'>) => {
  const introStage = useIntroStore(state => state.stage)
  const setIntroStage = useIntroStore(state => state.setState)
  const setNextAction = useIntroStore(state => state.setNextAction)

  useEffect(() => {
    if (introStage === IntroStage.NOT_STARTED) {
      setIntroStage(IntroStage.AUCTIONS)
    }
  }, [introStage, setIntroStage])

  let view = <></>

  if (introStage === IntroStage.AUCTIONS) {
    view = (
      <View className="h-full">
        <View className="mt-1">
          <Image
            className="w-full h-[100%]"
            source={require('../../assets/img/auctions-list.png')}
          />
        </View>
        <View className="absolute bottom-0 left-0 right-0">
          <LinearGradient
            locations={[0, 0.42]}
            colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
            className="flex flex-col gap-3 px-4 pb-3 pt-36">
            <Text className="text-orange font-extrabold text-2xl">
              Auctions
            </Text>
            <Text className="text-black font-extrabold text-2xl mb-12 pr-12">
              Track auctions from your favorite DAOs from the single place
            </Text>
            <Pressable
              onPress={() => {
                setIntroStage(IntroStage.WIDGETS)
              }}>
              <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
                <Text className="text-white">Let's go</Text>
              </View>
            </Pressable>
            <View className="pt-6">
              <Dots numberOfDots={3} currentIndex={0} />
            </View>
          </LinearGradient>
        </View>
      </View>
    )
  } else if (introStage === IntroStage.WIDGETS) {
    view = (
      <View className="h-full">
        <View className="mt-1">
          <Image
            className="w-full h-[92%]"
            source={require('../../assets/img/widgets-grid.png')}
          />
        </View>
        <View className="absolute bottom-0 left-0 right-0">
          <LinearGradient
            locations={[0, 0.42]}
            colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
            className="flex flex-col gap-3 px-4 pb-3 pt-40">
            <Text className="text-purple font-extrabold text-2xl">Widgets</Text>
            <Text className="text-black font-extrabold text-2xl mb-12 pr-12">
              Add widgets to the Home Screen to know what is happening without
              opening the app
            </Text>
            <Pressable
              onPress={() => {
                setIntroStage(IntroStage.ADD_DAOS)
              }}>
              <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
                <Text className="text-white">Cool</Text>
              </View>
            </Pressable>
            <View className="pt-6">
              <Dots numberOfDots={3} currentIndex={1} />
            </View>
          </LinearGradient>
        </View>
      </View>
    )
  } else if (introStage === IntroStage.ADD_DAOS) {
    view = (
      <View className="h-full">
        <View className="mt-4">
          <Image
            className="w-full h-[88%]"
            source={require('../../assets/img/dao-images-grid.png')}
          />
        </View>
        <View className="absolute bottom-0 left-0 right-0">
          <LinearGradient
            locations={[0, 0.42]}
            colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
            className="flex flex-col gap-3 px-4 pb-3 pt-44">
            <Text className="text-red font-extrabold text-2xl">
              Let's Start
            </Text>
            <Text className="text-black text-2xl mb-12 font-extrabold">
              Add your wallet to automatically load all your DAOs or add them
              manually
            </Text>
            <Pressable
              onPress={() => {
                setNextAction(IntroNextAction.ADD_WALLET)
                setIntroStage(IntroStage.DONE)
                navigation.navigate('Home', { screen: 'Settings' })
              }}>
              <View className="h-12 w-full bg-black rounded-lg items-center justify-center text-center">
                <Text className="text-white">Add Wallet</Text>
              </View>
            </Pressable>
            <Pressable
              onPress={() => {
                setNextAction(IntroNextAction.SEARCH_DAO)
                setIntroStage(IntroStage.DONE)
                navigation.navigate('Home', { screen: 'Daos' })
              }}>
              <View className="h-12 w-full bg-grey-one rounded-lg items-center justify-center text-center">
                <Text className="text-black">Add Manually</Text>
              </View>
            </Pressable>
            <View className="pt-6">
              <Dots numberOfDots={3} currentIndex={2} />
            </View>
          </LinearGradient>
        </View>
      </View>
    )
  }

  return (
    <View className="h-full bg-white">
      <SafeAreaView>{view}</SafeAreaView>
    </View>
  )
}

export default IntroScreen
