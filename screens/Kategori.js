import React, { Component } from "react";
import PropTypes from "prop-types";
import { AsyncStorage } from "react-native";
import { Container, Header, Content, Text, Icon, View } from "native-base";

import { FlatGrid } from "react-native-super-grid";

const data = [
  {
    id: "full-body",
    icon: <Icon name="ios-flask" />,
    text: "Full Body Massage"
  },
  {
    id: "shiatshu",
    icon: <Icon name="ios-git-compare" />,
    text: "Shiatshu"
  },
  {
    id: "reflexiogy",
    icon: <Icon name="ios-git-merge" />,
    text: "Reflexiogy"
  },
  {
    id: "totok",
    icon: <Icon name="ios-thunderstorm" />,
    text: "Totok Wajah"
  },
  {
    id: "lulur",
    icon: <Icon name="ios-thermometer" />,
    text: "Lulur"
  },
  {
    id: "segment",
    icon: <Icon name="ios-snow" />,
    text: "Segment Massage"
  },
  {
    id: "body-foot",
    icon: <Icon name="ios-rose" />,
    text: "Body & Foot Reflexiogy"
  }
];

export default class KategoriScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    })
  };

  static navigationOptions = {
    header: null
  };

  goToDetail(title) {
    this.props.navigation.navigate("Produk", { title });
  }

  async logOut() {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <Container>
        <Header />
        <Content style={{ flexDirection: "row" }}>
          <Text style={{fontSize:20, marginTop:10}}> Pilih Kategori </Text>
          <FlatGrid
            itemDimension={100}
            items={data}
            renderItem={({ item }) => (
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
                <Text onPress={this.goToDetail.bind(this, item.text)} style={{textAlign:'center'}}>
                  {item.text}
                </Text>
              </View>
            )}
          />
        </Content>
      </Container>
    );
  }
}
