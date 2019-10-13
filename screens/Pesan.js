import React, {Component} from 'react';
import {Platform,  Modal, TimePickerAndroid, View, Alert, AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import queryString from 'query-string'
import MapPicker from '../components/MapPicker'
import { 
    Container, 
    Content, 
    Text,
    Body,
    Left,
    Footer,
    Right,
    Button,
    ListItem,
    Picker,
    DatePicker,
    Textarea,
    Separator
} from 'native-base';
import url from '../constants/API';
import _ from 'lodash'


export default class App extends Component {
    state = {
      modalVisible    : false,
      location        : null,
      chosenDate      : '',
      choosenTime     : '',
      formatedLocation: '',
      selectedPayment : 'tunai',
      total           : 0
    };

    static navigationOptions = () => {
      
      return {
        title: 'Pesan Pijat',
      }
  };

  async componentDidMount(){
    this.user_id = await AsyncStorage.getItem("user_id")
    this.options = this.props.navigation.getParam('options', {tes:0})
    
    // object reduce total
    this.total_param =_.reduce(this.options, function(result, value, key) {
      return result + parseInt(value)
    }, 0);

    this.setState({
      total : this.total_param
    })
  }
  
  UNSAFE_componentWillMount() {  
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
      const formated = await this.formatLocation({lat:location.coords.latitude, lng:location.coords.longitude})


      this.setState({ 
        location: {
          lat:location.coords.latitude,
          lng:location.coords.longitude
        },
        formatedLocation: formated,
        total           : this.total_param,
      });

    };
  

    onValueChange(value) {
      this.setState({
        selectedPayment: value
      });
    }

    setModalVisible(visible) {
      this.setState({ modalVisible: visible });
    }  

    async handleSelectMap(lat, lng){

      this.setState({
        modalVisible: false,
        location    : {lat,lng},
        formatedLocation : await this.formatLocation({lat,lng})
      })
    }

    setDate(newDate){
      this.setState({chosenDate:newDate})
  }

  async formatLocation(location){
    if (!location) {
      return ''
    }
    const formatLocation = await Location.reverseGeocodeAsync({
      latitude : location.lat,
      longitude: location.lng
    })

    const  {street, city, region, postalCode} = formatLocation[0]
    return street + " " + city + " " + region  + " " + postalCode

  }

  async openTimePicker(){
      try {
          const {action, hour, minute} = await TimePickerAndroid.open({
            hour: 14,
            minute: 0,
            is24Hour: false, // Will display '2 PM'
          });
          if (action !== TimePickerAndroid.dismissedAction) {
            // Selected hour (0-23), minute (0-59)
            this.setState({choosenTime: hour + ':' + minute })
          }
        } catch ({code, message}) {
          console.warn('Cannot open time picker', message);
        }
  }

  async pesanMassage(){

    // before fetch

    const lokasi =  this.state.location
    const params = {
      latitude : lokasi.lat,
      longitude: lokasi.lng,
      payment : 'tunai',
      user_id : this.user_id
    }

    const stringified = queryString.stringify(params)
    let res
    try {
      res = await fetch( url + 'massage-app-server/order.php?' + stringified)
      .then(res=>res.text())
      res = JSON.parse(res)
      res.error = ""
      console.log({res})
    } catch (error) {
      console.log({error})
      Alert.alert('Error In Server.')
      return
    }

    if (res.error == ""){
      this.props.navigation.navigate('EndStep')
    } else {
      // Alert.alert(res.error)
    }

  }

  handleChangeAlamat(text){
    this.setState({
      formatedLocation: text
    })
  }

    
  render() {
      return (
      <Container>
        <Content>
        <Separator bordered>
          <Text>Waktu dan Lokasi Pemesanan</Text>
        </Separator>
        <ListItem>
          <Left>
            <Button>
              <DatePicker
                    date                    = {''}
                    defaultDate             = {new Date()}
                    minimumDate             = {new Date(2000, 1, 1)}
                    maximumDate             = {new Date(2999, 12, 31)}
                    locale                  = {"id"}
                    timeZoneOffsetInMinutes = {undefined}
                    modalTransparent        = {false}
                    animationType           = {"fade"}
                    androidMode             = {"default"}
                    placeHolderText         = "PILIH TANGGAL"
                    textStyle               = {{ color:'white' }}
                    placeHolderTextStyle    = {{ color: "white" }}
                    onDateChange            = {this.setDate.bind(this)}
                    disabled                = {false}
                />
            </Button>
          </Left>
          <Body>
            <Text>{this.state.chosenDate.toString().substr(4, 12)}</Text>
          </Body> 
          </ListItem>

          <ListItem>
              <Left>
                <Button onPress={this.openTimePicker.bind(this)}> 
                    <Text>Pilih Waktu</Text>
                </Button>
              </Left>
              <Body>
                <Text>{this.state.choosenTime}</Text>
              </Body>
          </ListItem>

          <ListItem last>
            <Modal
              presentationStyle = "fullScreen"
              animationType     = "slide"
              transparent       = {false}
              visible           = {this.state.modalVisible}>
                <MapPicker onLocationSelect={this.handleSelectMap.bind(this)}/>
            </Modal>
            <View style={{flexDirection:'column',alignItems:'flex-start'}}>
              <Textarea onChangeText={this.handleChangeAlamat.bind(this)} rowSpan={5} bordered placeholder="Masukan Alamat" value={this.state.formatedLocation}/>
              <Button onPress={() => {this.setModalVisible(true)}} style={{justifyContent:'center', alignSelf:'stretch'}}>
                <Text> Pilih Alamat </Text>
              </Button>
            </View>
          </ListItem>
          
          <Separator bordered>
            <Text>Detail Pembayaran</Text>
          </Separator>

          <ListItem last>
            <Picker
                note
                mode          = "dropdown"
                style         = {{ width: 120 }}
                selectedValue = {this.state.selectedPayment}
                onValueChange = {this.onValueChange.bind(this)}>
                  <Picker.Item label="Bank Transfer" value="bank_transfer" />
                  <Picker.Item label="Tunai" value="tunai" />
              </Picker>
          </ListItem> 
          
          <Separator bordered>
            <Text>Ringkasan</Text>
          </Separator>
          
          <ListItem>
            <Left><Text>Jenis Produk</Text></Left>
            <Body><Text>: {this.props.navigation.getParam('produk', 'unknown')}</Text></Body>
          </ListItem>       
          <ListItem>
              <Left><Text>Durasi</Text></Left>
              <Body><Text>: </Text></Body>
          </ListItem>
          <ListItem>
              <Left><Text>Waktu</Text></Left>
              <Body><Text>: {this.state.choosenTime}</Text></Body>
          </ListItem>
          <ListItem>
              <Left><Text>Alamat</Text></Left>
              <Body><Text>: {this.state.formatedLocation}</Text></Body>
          </ListItem>
          <ListItem last>
              <Left><Text>Detail Pembayaran</Text></Left> 
              <Body><Text>: {this.state.selectedPayment}</Text></Body>
          </ListItem>
          
        </Content>
        <Footer>
            <Left style={{flexDirection:'row', }}>
                <Text style={{color:'white'}}> Total </Text>
                <Text style={{color:'white'}}> Rp {this.state.total} </Text>
            </Left>
            <Right style={{marginRight:10}}>
                <Button success onPress={this.pesanMassage.bind(this)}>
                    <Text>Pesan</Text>
                </Button>
            </Right>
        </Footer>
      </Container>
      )
    }
  }