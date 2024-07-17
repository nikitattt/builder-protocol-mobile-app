import { ApolloProvider } from '@apollo/client'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'

import graphClient from './src/data/graphClient'
import DaosScreen from './src/screens/DaosScreen'
import { useColorScheme } from 'nativewind'
import SettingsScreen from './src/screens/SettingsScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import TabBar from './src/components/TabBar'
import { HomeTabParamList, RootStackParamList } from './src/navigation/types'
import DaoScreen from './src/screens/DaoScreen'
import { AppState, AppStateStatus, Platform, StatusBar } from 'react-native'
import { WagmiProvider } from 'wagmi'

import IntroScreen from './src/screens/IntroScreen'
import WidgetsSetupInfoScreen from './src/screens/WidgetsSetupInfoScreen'
import AppToast from './src/components/AppToast'
import { PostHogProvider } from 'posthog-react-native'
import { posthogAsync } from './src/constants/posthog'
import FeedScreen from './src/screens/FeedScreen'
import ProposalScreen from './src/screens/ProposalScreen'
import BidScreen from './src/screens/BidScreen'
import ProposalsScreen from './src/screens/ProposalsScreen'
import {
  focusManager,
  onlineManager,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { wagmiConfig } from './src/constants/viemWagmi'
import NetInfo from '@react-native-community/netinfo'

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected)
  })
})

const RootStack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<HomeTabParamList>()

const HomeTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="Daos"
        component={DaosScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

const queryClient = new QueryClient()

const App = () => {
  const { setColorScheme } = useColorScheme()

  useEffect(() => {
    setColorScheme('dark')
  }, [setColorScheme])

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      (status: AppStateStatus) => {
        if (Platform.OS !== 'web') {
          focusManager.setFocused(status === 'active')
        }
      }
    )

    return () => subscription.remove()
  }, [])

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} />
      <ApolloProvider client={graphClient}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <PostHogProvider client={posthogAsync}>
                <RootStack.Navigator initialRouteName="Home">
                  <RootStack.Screen
                    name="Home"
                    component={HomeTabs}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="Dao"
                    component={DaoScreen}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="Intro"
                    component={IntroScreen}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="WidgetsSetupInfo"
                    component={WidgetsSetupInfoScreen}
                    options={{ headerShown: false }}
                  />
                  <RootStack.Screen
                    name="Proposal"
                    component={ProposalScreen}
                    options={{ headerShown: true, headerShadowVisible: true }}
                  />
                  <RootStack.Screen
                    name="Proposals"
                    component={ProposalsScreen}
                    options={{ headerShown: true, headerShadowVisible: true }}
                  />
                  <RootStack.Screen
                    name="Bid"
                    component={BidScreen}
                    options={{ headerShown: true, headerShadowVisible: true }}
                  />
                </RootStack.Navigator>
              </PostHogProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </WagmiProvider>
      </ApolloProvider>
      <AppToast />
    </>
  )
}

export default App
