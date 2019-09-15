// eslint-disable-next-line no-unused-vars
import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import TabNavigator from './MainTabNavigator'
import RegisterScreen from "../screens/Register";
import LoginScreen from "../screens/Login";
import { Root } from "native-base";

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Main: TabNavigator,
      Register: RegisterScreen,
      Login: LoginScreen
    },
    {
      initialRouteName: "Login"
    }
  )
);

const App = () => (
  <Root>
    <AppNavigator />
  </Root>
);

export default App;
