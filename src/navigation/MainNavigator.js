// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { SCREEN } from '../../constants/Screen';


import KategoriScreen from '../../screens/Kategori';
import ProdukScreen from '../../screens/Produk';
import PesanScreen from '../screens_connect/PesanTes';
import WaitingScreen from '../../screens/WaitingScreen';
import MapShowScreen from '../screens_connect/FullScreenTes';
import LogScreen from '../screens_connect/Log';

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

export default MainStack;
