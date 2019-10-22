// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import TabNavigator from './MainTabNavigator';
import RegisterScreen from '../../screens/Register';
import LoginScreen from '../../screens/Login';

// debug screen
import SearcScreen from '../screens_connect/SearchScreenTes';
import { SCREEN } from '../../constants/Screen';


const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Main: TabNavigator,
      Register: RegisterScreen,
      Login: LoginScreen,
      [SCREEN.CARI_TERAPIS]: SearcScreen,
    },
    {
      initialRouteName: 'Login',
    },
  ),
);

export default AppNavigator;
