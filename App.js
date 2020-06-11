import React from 'react';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import SignUpScreen from "./src/screens/SignUpScreen";
import SignInScreen from "./src/screens/SignInScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import AccountScreen from "./src/screens/AccountScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import {Provider as AuthProvider} from "./src/context/AuthContext";
import {Provider as LocationProvider} from "./src/context/LocationContext";
import {Provider as TrackProvider} from "./src/context/TrackContext";
import {setNavigator} from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuth";
import {FontAwesome} from "@expo/vector-icons";

const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
});

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  LoginFlow: createStackNavigator({
    SignUp: SignUpScreen,
    SignIn: SignInScreen
  }),
  MainFlow: createBottomTabNavigator({
    TrackListFlow: trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  })
});

trackListFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: <FontAwesome name="th-list" size={20} />
}

const App = createAppContainer(switchNavigator)

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App
            ref={
              (navigator) => {setNavigator(navigator)}
            }
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};