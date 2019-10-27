import React, { Component } from 'react';
import { 
  AsyncStorage, View, Image, ToastAndroid,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Label,
} from 'native-base';
import URL from '../constants/API';
import { SCREEN } from '../constants/Screen';

export default class Login extends Component {

  static async validateLogin(email, password) {
    const body = new FormData();
    body.append('email', email);
    body.append('password', password);
    body.append('tipe', 'user');

    const res = await fetch(`${URL}massage-app-server/login.php`, {
      method: 'POST',
      body,
    })
      .then((r) => r.text())
      .then((r) => {
        try {
          return JSON.parse(r);
        } catch (error) {
          console.log('e', error, r);
          return r;
        }
      });
    return res;
  }

  constructor(props) {
    super(props);
    this.state = {
      email: 'aep.stmik@gmail.com',
      password: '123456',
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const isLogin = await AsyncStorage.getItem('login');
    if (isLogin) {
      navigation.navigate(SCREEN.HOME);
    }
  }

  async handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const { navigate } = navigation;
    const respon = await Login.validateLogin(email, password);
    if (respon.status) {
      // lempar screen
      await AsyncStorage.multiSet([['login', '1'], ['user_id', respon.data.id]])
      navigate('Main');
    } else {
      // toast message
      ToastAndroid.show(respon.message, ToastAndroid.SHORT);
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
            <Image source={require("../assets/images/logo-m.png")} />
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
                marginLeft    : 20,
                marginRight   : 20,
                marginTop     : 20
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

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
