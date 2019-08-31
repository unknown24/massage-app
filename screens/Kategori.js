import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
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
    Right,
    Button
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    itemKategori : {
        justifyContent: 'flex-start',
        alignItems    : 'center',
        height        : 100
    },
  });

const data = [
    {
        id  : "full-body",
        icon: <Icon name="ios-car" />,
        text: "Full body Massage",
    },
    {
        id : "shiatshu",
        icon : <Icon name="ios-car" />,
        text : "Shiatshu"
    },
    {
        id : "reflexiogy",
        icon : <Icon name="ios-car" />,
        text : "Reflexiogy"
    },
    {
        id : "totok",
        icon : <Icon name="ios-car" />,
        text : "Totok Wajah"
    },
    {
        id : "lulur",
        icon : <Icon name="ios-car" />,
        text : "Lulur"
    },
    {
        id : "segment",
        icon : <Icon name="ios-car" />,
        text : "Segment Massage"
    },
    {
        id : "body-foot",
        icon : <Icon name="ios-car" />,
        text : "body Massage & Foot Reflexiogy"
    },

]

export default class KategoriScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    goToDetail(title){
        this.props.navigation.navigate('Produk', {title})
    }

  render() {

    const row1 = data.filter((obj,i) => i < 4)
    const row2 = data.filter((obj,i) => i >= 4)
    
    return (
      <Container>
        <Header/>
        <Content>
            <Grid>
                <Row>
                    {row1.map(obj => {
                        return (
                            <Col 
                                key={obj.id} >
                                <TouchableOpacity onPress={this.goToDetail.bind(this, obj.text)} style={styles.itemKategori}>
                                    {obj.icon}
                                    <Text style={{textAlign:"center"}}>{obj.text}</Text>
                                </TouchableOpacity>
                            </Col>
                        )
                    })}
                </Row>
                <Row>
                    {row2.map(obj => {
                        return (
                            <Col key={obj.id}>
                                <TouchableOpacity onPress={this.goToDetail.bind(this, obj.id)} style={styles.itemKategori}>
                                    {obj.icon}
                                    <Text style={{textAlign:"center"}}>{obj.text}</Text>
                                </TouchableOpacity>
                            </Col>
                        )
                    })}
                </Row>
            </Grid>

            
        </Content>
      </Container>
    );
  }
}