// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { SCREEN } from '../../../constants/Screen';


import TabBarIcon from '../../../components/TabBarIcon';
import KategoriScreen from '../../../screens/Kategori';
import ProdukScreen from '../../../screens/Produk';
import PesanScreen from '../../screens_connect/PesanTes';
import WaitingScreen from '../../../screens/WaitingScreen';
import MapShowScreen from '../../screens_connect/FullScreenTes';
import LogScreen from '../../screens_connect/Log';

const MainStack = createStackNavigator(
  {
    [SCREEN.HOME]: KategoriScreen,
    Produk: ProdukScreen,
    Konfirmasi: KategoriScreen,
    EndStep: WaitingScreen,
    [SCREEN.PESAN]: PesanScreen,
    [SCREEN.SHOW_LOCATION]: MapShowScreen,
    [SCREEN.LOG]: LogScreen,
  },
  {
    initialRouteName: SCREEN.HOME,
    navigationOptions: {
      header: null,
    },
  },
);

MainStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  console.log(navigation.state.routes, SCREEN.SHOW_LOCATION, navigation.state.index)

  if (navigation.state.routes[0].routeName === SCREEN.SHOW_LOCATION) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-home${focused ? '' : '-outline'}`
            : 'md-home'
        }
      />
    ),
  };
};

export default MainStack;
