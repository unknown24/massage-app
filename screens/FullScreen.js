import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Alert,
  Clipboard,
  ToastAndroid,
} from 'react-native';
import {
  Text,
  List,
  ListItem,
  Left,
  Thumbnail,
  Body,
  Right,
  Button,
  Separator,
} from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import PropTypes from 'prop-types';

import Roboto from '../node_modules/native-base/Fonts/Roboto.ttf';
import robotoMedium from '../node_modules/native-base/Fonts/Roboto_medium.ttf';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeUpContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

class FullScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        coords: {
          latitude: -6.880327,
          longitude: 107.5900023,
        },
      },
      ready: false,
    };
  }

  componentWillMount() {
    this.getLocationAsync();
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto,
      Roboto_medium: robotoMedium,
      ...Ionicons.font,
    });
    this.setState({ ready: true });
  }

  getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });

    /**
     *
        Object {
        "coords": Object {
            "accuracy": 16,
            "altitude": 0,
            "heading": 0,
            "latitude": -6.880327,
            "longitude": 107.5900023,
            "speed": 0,
        },
        "mocked": false,
        "timestamp": 1571322126908,
        }
      */
  };

  copyText = () => {
    const { kontak } = this.props;
    Clipboard.setString(kontak);
    ToastAndroid.show('Teks telah di salin !', ToastAndroid.SHORT);
  }


    static navigationOptions = {
      header: null,
    };

    render() {
      const { location, ready } = this.state;
      const { height } = Dimensions.get('window');
      const {
        layanan, type, kontak, posisi, onBatakan,
      } = this.props;

      return (
        <View style={styles.container}>
          {!ready
            ? <Text />
            : (
              <View>
                <MapView
                  initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  style={styles.mapStyle}
                >
                  <Marker
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    title="Juara"
                    description="mantap"
                  />
                </MapView>
                <SlidingUpPanel
                  ref={(c) => { this.panel = c; }}
                  draggableRange={{ top: height - 100, bottom: 100 }}
                >
                  <View style={styles.swipeUpContainer}>
                    <View style={{ alignSelf: 'center' }}>
                      <MaterialIcons name="drag-handle" size={24} />
                    </View>
                    <View>
                      <List>
                        <ListItem avatar>
                          <Left>
                            <Thumbnail source={{ uri: 'https://picsum.photos/200/300' }} />
                          </Left>
                          <Body>
                            <Text>Agus Supriono </Text>
                            <Text note numberOfLines={1}>Rp 140.000 (+50.000 / 1500m)</Text>
                          </Body>
                        </ListItem>
                        <ListItem>
                          <Body>
                            <Button info bordered style={{ justifyContent: 'center' }}><Text onPress={onBatakan}>Batalkan</Text></Button>
                          </Body>
                        </ListItem>
                        <Separator bordered>
                          <Text>{type === 'terapis' ? 'Info Terapis' : 'Info Pemesan'}</Text>
                        </Separator>
                        <ListItem style={{ alignItems: 'center' }}>
                          <Text>Posisi </Text>
                          <Body>
                            <Text>
                              :
                              {posisi}
                            </Text>
                          </Body>
                        </ListItem>

                        <ListItem>
                          <Text>Kontak </Text>
                          <Body>
                            <Text>
                              :
                              {kontak}
                            </Text>
                          </Body>
                          <Right>
                            <Button transparent onPress={this.copyText}>
                              <MaterialIcons name="content-copy" size={24} />
                            </Button>
                          </Right>
                        </ListItem>
                        <Separator bordered>
                          <Text>Info Layanan</Text>
                        </Separator>
                        {layanan.map((text, i) => (
                          <ListItem key={i.toString()}>
                            <Text>{text}</Text>
                          </ListItem>
                        ))}
                      </List>
                    </View>
                  </View>
                </SlidingUpPanel>
              </View>
            )}
        </View>
      );
    }
}

FullScreen.propTypes = {
  layanan: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(['terapis', 'client']),
  kontak: PropTypes.string,
  posisi: PropTypes.string,
  onBatakan: PropTypes.func,
};

FullScreen.defaultProps = {
  layanan: ['Full Body Massage', '1 Jam'],
  type: 'terapis',
  kontak: '089776445332',
  posisi: 'Jl gagak no 7 sukajadi sumedang selatan bandung',
  onBatakan: (e) => console.log(e),
};

export default FullScreen;
