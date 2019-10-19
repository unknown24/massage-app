// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { SCREEN } from '../constants/Screen';


import KategoriScreen from '../screens/Kategori';
import ProdukScreen from '../screens/Produk';
import PesanScreen from '../screens/Pesan';
import WaitingScreen from '../screens/WaitingScreen';
import MapShowScreen from '../screens/redux-integration/FullScreenTes';

const MainStack = createStackNavigator(
  {
    Kategori: KategoriScreen,
    Produk: ProdukScreen,
    Pesan: PesanScreen,
    Konfirmasi: KategoriScreen,
    EndStep: WaitingScreen,
    [SCREEN.SHOW_LOCATION]: MapShowScreen,
  },
  {
    initialRouteName: SCREEN.SHOW_LOCATION,
    navigationOptions: {
      header: null,
    },
  },
);

export default MainStack;
