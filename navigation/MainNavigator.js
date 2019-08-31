import React from 'react';
import { createStackNavigator } from 'react-navigation';

import KategoriScreen from '../screens/Kategori';
import ProdukScreen from '../screens/Produk';
import PesanScreen from '../screens/Pesan';

const MainStack = createStackNavigator(
  {
    Kategori  : KategoriScreen,
    Produk    : ProdukScreen,
    Pesan     : PesanScreen,
    Konfirmasi: KategoriScreen,
  },
  {
    initialRouteName: 'Pesan',
  }
);

export default MainStack;