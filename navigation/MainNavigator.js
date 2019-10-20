// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { SCREEN } from '../constants/Screen';


import KategoriScreen from '../screens/Kategori';
import ProdukScreen from '../screens/Produk';
import PesanScreen from '../screens/redux-integration/PesanTes';
import WaitingScreen from '../screens/WaitingScreen';
import MapShowScreen from '../screens/redux-integration/FullScreenTes';

const MainStack = createStackNavigator(
  {
    [SCREEN.HOME]: KategoriScreen,
    Produk: ProdukScreen,
    Konfirmasi: KategoriScreen,
    EndStep: WaitingScreen,
    [SCREEN.PESAN]: PesanScreen,
    [SCREEN.SHOW_LOCATION]: MapShowScreen,
  },
  {
    initialRouteName: SCREEN.HOME,
    navigationOptions: {
      header: null,
    },
  },
);

export default MainStack;
