import React, {Component} from 'react';
import { Platform, StyleSheet,  Modal, TouchableHighlight, Image,TimePickerAndroid, View, Alert } from 'react-native';
import Constants from 'expo-constants';
import MapPicker from '../components/MapPicker'
import { 
    Container, 
    Header, 
    Content, 
    Text,
    Body,
    Title,
    Grid,
    Col,
    Row,
    Icon, 
    Left,
    Input,
    Footer,
    FooterTab,
    Right,
    Button,
    Card,
    CardItem,
    Thumbnail,
    ListItem,
    Picker,
    Form,
    List,
    Item,
    Label,
    CheckBox,
    Separator,
    DatePicker
} from 'native-base';
import initApp from '../constants/firebase';

const firebase = initApp()
const dbh = firebase.firestore();




export default class App extends Component {
    state = {
      modalVisible: false,
      location    : null,
      chosenDate  : '',
      selected    : "key1"
    };

    onValueChange(value) {
      this.setState({
        selected: value
      });
    }

    setModalVisible(visible) {
      this.setState({ modalVisible: visible });
    }  
    
    async parseLocation(lat, lng){
      return fetch('https://api.opencagedata.com/geocode/v1/json?q=LAT+LNG&key=d499aaad313d44a38a97cbb51be4a37d').then(res=> res.json)
    }

    handleSelectMap(lat, lng){
      this.setState({
        modalVisible: false,
        location    : {lat,lng}
      })
    }

    setDate(newDate){
      console.log(newDate)
      this.setState({chosenDate:newDate})
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
            console.log(action, hour, minute)
          }
        } catch ({code, message}) {
          console.warn('Cannot open time picker', message);
        }
  }

  async pesanMassage(){
    
    const transactionList = dbh.collection("partner").doc("transaction")
    transactionList.update({
      list: firebase.firestore.FieldValue.arrayUnion({
        user_id : 24,
        location: new firebase.firestore.GeoPoint(0.1, 0.2),
        status  : 'apply'   // apply, ongoing, reject, finish  
      })
    })

  }

  componentDidMount(){
    var starCountRef = firebase.database().ref('users/bagus');
    starCountRef.on('value', function(snapshot) {
      console.log(snapshot.val())
    });
  }
    
    render() {
      return (
            <Container>
        {/* <Header>
        <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Full Body</Title>
          </Body>
          <Right />
        </Header> */}
        <Content>
        <Separator bordered>
            <Text>Waktu dan Lokasi Pemesanan</Text>
          </Separator>
          <ListItem>
          <DatePicker
                defaultDate             = {new Date(2018, 4, 4)}
                minimumDate             = {new Date(2000, 1, 1)}
                maximumDate             = {new Date(2999, 12, 31)}
                locale                  = {"id"}
                timeZoneOffsetInMinutes = {undefined}
                modalTransparent        = {false}
                animationType           = {"fade"}
                androidMode             = {"default"}
                placeHolderText         = "Select date"
                textStyle               = {{ color: "green" }}
                placeHolderTextStyle    = {{ color: "#d3d3d3" }}
                onDateChange            = {this.setDate.bind(this)}
                disabled                = {false}
            />
            <Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
            <Button onPress={this.openTimePicker.bind(this)}> 
                <Text>Select Time</Text>
            </Button>
          </ListItem>
          <ListItem last>
            <Modal
              presentationStyle = "fullScreen"
              animationType     = "slide"
              transparent       = {false}
              visible           = {this.state.modalVisible}>
                <MapPicker onLocationSelect={this.handleSelectMap.bind(this)}/>
          </Modal>

          <Button onPress={() => {this.setModalVisible(true)}}>
            <Text>Pilih Alamat </Text>
          </Button>
          <Input />
          </ListItem>
          <Separator bordered>
            <Text>Detail Pembayaran</Text>
          </Separator>
          <ListItem last>
          <Picker
              note
              mode          = "dropdown"
              style         = {{ width: 120 }}
              selectedValue = {this.state.selected}
              onValueChange = {this.onValueChange.bind(this)}
            >
              <Picker.Item label="Bank Transfer" value="key0" />
              <Picker.Item label="Tunai" value="key1" />
            </Picker>
          </ListItem> 
          <Separator bordered>
            <Text>Ringkasan</Text>
          </Separator>
          <ListItem>
              <Text>Jenis Produk</Text>
          </ListItem>       
          <ListItem>
              <Text>Durasi</Text>
          </ListItem>
          <ListItem>
              <Text>Waktu</Text>
          </ListItem>
          <ListItem>
              <Text>Alamat</Text>
          </ListItem>
          <ListItem last>
              <Text>Detail Pembayaran</Text>
          </ListItem>
          
        </Content>
        <Footer>
            {/* <Grid>
              <Row style={{backgroundColor:'white'}}>
                
              </Row>
              <Row>

              </Row>
            </Grid> */}
            <Left style={{flexDirection:'row', }}>
                <Text style={{color:'white'}}> Total </Text>
                <Text style={{color:'white'}}> Rp 100000 </Text>
            </Left>
            <Right style={{marginRight:10}}>
                <Button success onPress={this.pesanMassage}>
                    <Text>Pesan</Text>
                </Button>
            </Right>
            {/* <FooterTab>
            </FooterTab> */}
        </Footer>
      </Container>
      )
    }
  }