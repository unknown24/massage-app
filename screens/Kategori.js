import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncStorage, Image } from "react-native";
import { Container, Header, Content, Text, View, Button } from "native-base";

import { FlatGrid } from "react-native-super-grid";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// get data
import { getProduct } from '../library/api-request'

const imageURI = 'http://blog.travelio.com/wp-content/uploads/2018/11/FB.jpg'

export default class KategoriScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    })
  };

  static navigationOptions = {
    header: null
  };

  state = {
    data: []
  }

  async componentDidMount(){
    const res = await getProduct()
    this.setState({data: res.status ? [...res.data] : []})
  }

  goToDetail(title, description, image, id) {
    this.props.navigation.navigate("Produk", { title, description, image, id });
  }

  async logOut() {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <Container>
        <Header />
        <Content style={{ flexDirection: "column"}}>
          
          <Image 
            source={{uri: imageURI }} 
            resizeMode = {'stretch'}
            style={{ height: 180, width: null, marginTop:20}}/>

          <Text style={{fontSize:20, marginTop:10}}> Pilih Kategori </Text>
          <FlatGrid
            itemDimension={100}
            items={this.state.data}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback onPress={this.goToDetail.bind(this, item.name, item.desc, item.image, item.id)}>
                <View style={{
                    borderStyle   : 'solid',
                    borderWidth   : 1,
                    borderColor   : 'black',
                    height        : 100,
                    justifyContent: 'center',
                    alignItems    : 'center',
                    borderRadius  : 5
                }}>
                    {item.icon}
                    <Text  style={{textAlign:'center'}}>
                      {item.name}
                    </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
          <Button onPress={this.logOut.bind(this)}><Text>Logout</Text></Button>
        </Content>
      </Container>
    );
  }
}
