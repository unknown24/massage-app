import React, { Component } from 'react';
import {Image} from 'react-native'
import { 
    Container, 
    Content, 
    Text,
    Icon, 
    Footer,
    FooterTab,
    Button,
    Card,
    CardItem,
    Picker,
    Label,
    View,
} from 'native-base';
import { getProductPricing } from '../library/api-request';
import _ from 'lodash';


const data = {
    image      : 'https://picsum.photos/500/300',
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
}

export default class ProdukScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          title: params ? params.title : 'A Nested Details Screen',
        }
    };

    state = {
        current_price   : {tes:0},
        options         : {}
    }


    async componentDidMount(){
      const id = this.props.navigation.getParam('id', null)
      const respon = await getProductPricing(id)
      _.mapValues(respon.data, (val)=> val[0].price)
      
      this.setState({
        options : respon.status ? respon.data : {},
        current_price: _.mapValues(respon.data, (val)=> val[0].price )
      })

    }

    handlePesan(){

        this.props.navigation.navigate('Pesan', {
          produk: this.props.navigation.getParam('title', 'unknown'),
          durasi:this.state.selected
        })
    }

    hanldeChangeOption(key, value){
      const temp = Object.assign({},this.state)

      this.setState(
        _.set(temp, `current_price.${key}`, value )
      )
    }


  render() {

    return (
      <Container>
        <Content>
          <Card>
            <CardItem cardBody>
              <Image source={{uri:this.props.navigation.getParam('image', data.image)}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
                <Text>{this.props.navigation.getParam('description', data.description)}</Text>
            </CardItem>
            
           {
            _.map(this.state.options, function(value, key) {
              return (
                <View key={key} style={{flexDirection:'column', marginLeft:10, marginRight:10, marginBottom:20}}>
                  <Label>{key}</Label>
                  <Picker
                      mode                 = "dropdown"
                      iosIcon              = {<Icon name="arrow-down" />}
                      placeholder          = "Select your SIM"
                      placeholderStyle     = {{ color: "#bfc6ea" }}
                      placeholderIconColor = "#007aff"
                      style                = {{ width: undefined }} 
                      selectedValue        = {_.get(this.state.current_price , key)}
                      onValueChange        = {this.hanldeChangeOption.bind(this,key)}
                      >
                      {value.map(val => <Picker.Item key={val.id} label={val.name} value={val.price} /> )} 
                  </Picker>
                  <View style={{flexDirection:'row'}}>
                    <Text> Harga : </Text><Text> {_.get(this.state.current_price , key)} </Text>
                  </View>
                </View> 
              )}.bind(this))
            }

          </Card>            
        </Content>
        <Footer>
            <FooterTab>
                <Button full onPress={this.handlePesan.bind(this)}>
                    <Text>Pesan</Text>
                </Button>
            </FooterTab>
        </Footer>
      </Container>
    );
  }
}