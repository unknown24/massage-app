import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

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
import URL from '../constants/API'
import { ToastAndroid } from 'react-native';

export default class AnatomyExample extends Component {
  
    state = {
        email   : 'aep.stmik@gmail.com',
        password: '123456'
    } 


  async handleLogin(){
    
    const {email, password} = this.state
    const {navigate} = this.props.navigation;

    const respon = await this.validateLogin(email, password)

    if (respon.status) {
        // lempar screen
        await AsyncStorage.setItem("login", "1")
        navigate('Main')

    } else {
        // toast message
        ToastAndroid.show(respon.message, ToastAndroid.SHORT);
    }

  }

  validateLogin(email, password){
    const body = new FormData()
    body.append("email", email)
    body.append("password", password)

    return  fetch(URL +'massage_app/login.php', {
        method:'POST',
        body  :body
    }).then(res => res.json())
  }

  async componentDidMount(){
    const isLogin = await AsyncStorage.getItem('login')
    if (!!isLogin) {
        ToastAndroid.show(isLogin, ToastAndroid.SHORT);
    }
  }

  render() {
    return (
      <Container>
        <Header/>
        <Content>
          <Form>
            <Item floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={(text) => this.setState({email:text})} value={this.state.email}/>
            </Item>
            <Item floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry onChangeText={(text) => this.setState({password:text})} value={this.state.password}/>
            </Item>
            <Button onPress={this.handleLogin.bind(this)} primary style={{justifyContent:'center'}}><Text> Login </Text></Button>
          </Form>
        </Content>
      </Container>
    );
  }
}