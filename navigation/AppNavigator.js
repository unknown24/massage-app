// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import TabNavigator from './MainTabNavigator';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';

// debug screen
import WaitingScreen from '../screens/WaitingScreen'


const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Main: TabNavigator,
      Register: RegisterScreen,
      Login: LoginScreen,
      WaitingScreen
    },
    {
      initialRouteName: "Login"
    }
  )
);

export default AppNavigator;
