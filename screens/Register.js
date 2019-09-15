import React, { Component } from "react";
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
  Label,
  View,
  Toast
} from "native-base";
import { postFetch } from "../library/Fetch";
import url from "../constants/API";

export default class AnatomyExample extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func
    })
  };

  state = {
    email: "",
    telepon: "",
    password: "",
    confirmPassword: ""
  };

  async handleRegister() {
    const res = await postFetch(url + "/massage-app-server/register.php", {
      email: this.state.email,
      telepon: this.state.telepon,
      password: this.state.password,
      tipe: "user"
    });

    if (res.status) {
      Toast.show({
        text: "Berhasil daftar",
        buttonText: "ok",
        onClose: () => {
          this.props.navigation.navigate("Login");
        }
      });
    } else {
      console.log(res);
    }
    this.setState({
      email: "",
      telepon: "",
      password: "",
      confirmPassword: ""
    });
  }

  goToLoginScreen() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form style={{ marginTop: 20 }}>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                value={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
            </Item>
            <Item floatingLabel>
              <Label>No Telepon</Label>
              <Input
                value={this.state.telepon}
                onChangeText={text => this.setState({ telepon: text })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                secureTextEntry
                value={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
            </Item>
            <Item floatingLabel>
              <Label>Konfirmasi Password</Label>
              <Input
                secureTextEntry
                value={this.state.confirmPassword}
                onChangeText={text => this.setState({ confirmPassword: text })}
              />
            </Item>
            <Button
              onPress={this.handleRegister.bind(this)}
              primary
              style={{
                justifyContent: "center",
                marginLeft: 10,
                marginRight: 10,
                marginTop: 20,
                marginBottom: 20
              }}
            >
              <Text> Register </Text>
            </Button>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text>Sudah punya akun? </Text>
              <Text
                style={{ color: "blue" }}
                onPress={this.goToLoginScreen.bind(this)}
              >
                Masuk disini
              </Text>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}
