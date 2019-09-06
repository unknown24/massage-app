import React from 'react';
import { createStackNavigator } from 'react-navigation';

import KategoriScreen from '../screens/Kategori';
import ProdukScreen from '../screens/Produk';
import PesanScreen from '../screens/Pesan';
import WaitingScreen from '../screens/WaitingScreen';


const MainStack = createStackNavigator(
  {
    Kategori  : KategoriScreen,
    Produk    : ProdukScreen,
    Pesan     : PesanScreen,
    Konfirmasi: KategoriScreen,
    EndStep   : WaitingScreen,
  },
  {
    initialRouteName: 'Pesan',
  }
);

export default MainStack;