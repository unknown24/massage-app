import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import stores from './src/reducers/index.ts';

import AppNavigator from './src/screens/navigation/AppNavigator';
import NavigationService from './src/screens/navigation/NavigationService';


const roboto = require('native-base/Fonts/Roboto.ttf');
const robotoMedium = require('native-base/Fonts/Roboto_medium.ttf');
const robotDev = require('./assets/images/robot-dev.png');
const robotProd = require('./assets/images/robot-prod.png');
const spaceMono = require('./assets/fonts/SpaceMono-Regular.ttf');


const middlewares = [thunk];
const store = createStore(stores, applyMiddleware(...middlewares));

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      robotDev,
      robotProd,
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      'space-mono': spaceMono,
      Roboto: roboto,
      Roboto_medium: robotoMedium,
    }),
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { skipLoadingScreen } = props;

  if (!isLoadingComplete && !skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  }


  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator
          ref={(navigatorRef) => NavigationService.setTopLevelNavigator(navigatorRef)}
        />
      </View>
    </Provider>
  );
}

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};

App.defaultProps = {
  skipLoadingScreen: false,
};
