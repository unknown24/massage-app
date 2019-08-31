import React, { Component } from 'react';
import {StyleSheet, Image, TimePickerAndroid, View} from 'react-native'
// import MapPicker from "react-native-map-picker";
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
import { TouchableOpacity, Switch } from 'react-native-gesture-handler';
import MapPicker from '../components/MapPicker'

const styles = StyleSheet.create({
    itemKategori : {
        justifyContent: 'flex-start',
        alignItems    : 'center',
        height        : 100
    },
  });

const data = {
    image      : 'https://picsum.photos/500/300',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
}

export default class PesanScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          title: params ? params.title : 'A Nested Details Screen',
        }
    };

    state = {
        selected: 'key1',
        chosenDate: ''
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

  render() {

    
    return (

        <MapPicker/>
    );
  }
}