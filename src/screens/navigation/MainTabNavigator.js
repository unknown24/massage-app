import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../../../components/TabBarIcon';
// import LinksScreen from '../../../screens/LinksScreen';
import SettingsScreen from '../../../screens/SettingsScreen';
import MainStack from './MainNavigator';
import LogScreen from '../../screens_connect/Log';
// import { SCREEN } from '../../../constants/Screen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config,
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MainStack,
  SettingsStack,
  Log: LogScreen,
});

tabNavigator.path = '';

export default tabNavigator;
