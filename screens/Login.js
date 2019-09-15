import React, { Component } from "react";
import { AsyncStorage, View, Image } from "react-native";
import PropTypes from "prop-types";

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Label
} from "native-base";
import URL from "../constants/API";
import { ToastAndroid } from "react-native";

export default class Login extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    })
  };

  state = {
    email: "aep.stmik@gmail.com",
    password: "123456"
  };

  async handleLogin() {
    const { email, password } = this.state;
    const { navigate } = this.props.navigation;
    const respon = await this.validateLogin(email, password);
    if (respon.status) {
      // lempar screen
      await AsyncStorage.setItem("login", "1");
      navigate("Main");
    } else {
      // toast message
      console.log(respon);
      ToastAndroid.show(respon.message, ToastAndroid.SHORT);
    }
  }

  async validateLogin(email, password) {
    
    const body = new FormData();
    body.append("email", email);
    body.append("password", password);
    body.append("tipe", "user");

    const res = await fetch(URL + "massage-app-server/login.php", {
      method: "POST",
      body: body
    })
      .then(r => r.text())
      .then(r => {
        try {
          return JSON.parse(r);
        } catch (error) {
          console.log("e", error, r);
          return r;
        }
      });

    return res;
  }

  async componentDidMount() {
    const isLogin = await AsyncStorage.getItem("login");
    if (isLogin) {
      this.props.navigation.navigate("Home");
      ToastAndroid.show(isLogin, ToastAndroid.SHORT);
    }
  }

  goToRegisterScreen() {
    this.props.navigation.navigate("Register");
  }

  render() {
    return (
      <Container>
        <Header />
        <Content contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              height: 200,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={require("../assets/images/app-store.png")} />
          </View>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </Item>
            <Button
              onPress={this.handleLogin.bind(this)}
              info
              style={{
                justifyContent: "center",
                marginLeft: 20,
                marginRight: 20,
                marginTop: 20
              }}
            >
              <Text> Login </Text>
            </Button>
            <View style={{ flexDirection: "row", marginTop:20 , alignItems:'center', justifyContent: 'center'}}>
              <Text>Belum punya akun? </Text>
              <Text style={{ color: "blue" }} onPress={this.goToRegisterScreen.bind(this)}> Daftar disini</Text>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}
