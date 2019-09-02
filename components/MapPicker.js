import React, {Component} from 'react';
import MapView from 'react-native-maps';
import MapPicker from "react-native-map-picker";

import { Platform, Text, View, StyleSheet } from 'react-native';
// import Colors from '../constants/Colors';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class MapSelect extends Component {
    state = {
      location: null,
      errorMessage: null,
    };
  
    componentWillMount() {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        this._getLocationAsync();
      }
    }
  
    _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }
  
      let location = await Location.getCurrentPositionAsync({});
      this.setState({ location });
    };
  
    render() {

      const {location} = this.state

      if (location){
        
        return (
          <View style={{flex: 1}}>
            <MapPicker
              initialCoordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              onLocationSelect={({latitude, longitude})=>this.props.onLocationSelect(latitude,longitude)}
            />
          </View>
        )

      } else {
          return <View><Text>Loading</Text></View>
        }
    }
  }

  MapSelect.defaultProps = {
    onLocationSelect : (lat, lng) => console.log(lat, lng)
  } 
  
  
  const styles = StyleSheet.create({
    container: {
      flex           : 1,
      alignItems     : 'center',
      justifyContent : 'center',
      paddingTop     : Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin   : 24,
      fontSize : 18,
      textAlign: 'center',
    },
  });
