import React from 'react'
import { Container, Text, View, Header, Content } from 'native-base'
import Image from 'react-native-remote-svg';


export default class TransferScreen extends React.Component{
    render(){
        return(
            <Container>
                <Content>
                    <Text style={{textAlign:'center'}}>
                        Silahkan transfer uang ke 908089809889809..
                    </Text>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Image
                            style={{width:200, textAlign:'center'}} 
                            source={require('../../assets/images/money-transfer.svg')} />
                    </View>  
                </Content>          
            </Container>
        )
    }
}