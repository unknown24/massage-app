import React from 'react'
import { Container, Text, View, Header, Content, Button } from 'native-base'
import Image from 'react-native-remote-svg';
import PropTypes from "prop-types";


const type = {
    timeout : {
        label : 'Maaf tidak ada pemijat di sekitar anda',
        image : require('../../assets/images/money-transfer.svg')
    }, 
    search : {
        label : 'Tunggu sistem sedang mencari pemijat',
        image : require('../../assets/images/worker.svg')
    }
} 

export default class PesananScreen extends React.Component{

    renderData(){
        return {
            label : type[this.props.tipe].label,
            image : type[this.props.tipe].image
        }
    }

    batalkanPesanan(){
          _.get( this.props, "onPressBatalPesan") &&  this.props.onPressBatalPesan()
    }

    render(){
        return(
            <Container>
                <Header />
                <Content>
                    <Text style={{textAlign:'center'}}>
                        {this.renderData().label}
                    </Text>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Image
                            style={{width:200, textAlign:'center'}} 
                            source={this.renderData().image} />
                    </View> 
                    <Button onPress={this.batalkanPesanan.bind(this)} style={{justifyContent:'center'}}>
                        <Text> Batalkan Pesanan </Text>
                    </Button>
                </Content>          
            </Container>
        )
    }
}

PesananScreen.defaultProps = {
    tipe : 'search'
}

PesananScreen.propTypes = {
    tipe : PropTypes.oneOf(['timeout', 'search']),
}