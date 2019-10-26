// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import { SCREEN } from '../../../constants/Screen';


import TabBarIcon from '../../../components/TabBarIcon';
import KategoriScreen from '../../screens_connect/Kategory';
import ProdukScreen from '../../../screens/Produk';
import PesanScreen from '../../screens_connect/PesanTes';
import WaitingScreen from '../../../screens/WaitingScreen';
import MapShowScreen from '../../screens_connect/ShowLocationTes';
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

function Tabbar({ focused }) {
  return (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  );
}

Tabbar.propTypes = {
  focused: PropTypes.bool.isRequired,
};

MainStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  if (navigation.state.index > 0 && navigation.state.routes[1].routeName === SCREEN.SHOW_LOCATION) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: Tabbar,
  };
};

export default MainStack;
