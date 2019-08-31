import React, { Component } from 'react';
import {StyleSheet, Image} from 'react-native'
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
    View,
    CheckBox,
} from 'native-base';
import { TouchableOpacity, Switch } from 'react-native-gesture-handler';

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

export default class ProdukScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        
        return {
          title: params ? params.title : 'A Nested Details Screen',
        }
    };

    state = {
        selected: 'key1'
    }

    handlePesan(){
        this.props.navigation.navigate('Pesan')
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
        
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri:data.image}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri:data.image}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
                <Text>{data.description}</Text>
            </CardItem>

            <CardItem style={{flexDirection:'column', alignItems:'flex-start'}}>
                <Text>Jenis Kelamin</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Icon name="ios-man" />
                    <Text> Laki - Laki </Text>
                </View>
            </CardItem>
            
            <CardItem style={{flexDirection:'column', alignItems:'flex-start'}}>
                <Label > Pilih Durasi </Label>
                <Item picker>                
                    <Picker
                        mode                 = "dropdown"
                        iosIcon              = {<Icon name="arrow-down" />}
                        placeholder          = "Select your SIM"
                        placeholderStyle     = {{ color: "#bfc6ea" }}
                        placeholderIconColor = "#007aff"
                        style                = {{ width: undefined }}
                        selectedValue        = {this.state.selected}
                        onValueChange        = {(value)=> this.setState({selected:value})}
                        >
                            <Picker.Item label="60 Menit" value="60" />
                            <Picker.Item label="90 Menit" value="90" />
                            <Picker.Item label="120 Menit" value="120" />
                    </Picker>    
                </Item>
            </CardItem>            
            <CardItem>
                <Left>
                    <CheckBox checked={false} />
                    <Text> Term and Aggreement</Text>
                </Left>         
            </CardItem>
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