import React from 'react'
import { Container, Text, View, Header, Content } from 'native-base'
import Image from 'react-native-remote-svg';


export default class SearchScreen extends React.Component{
    render(){
        return(
            <Container>
                <Content>
                    <Text style={{textAlign:'center'}}>
                        Tunggu sistem sedang mencari pemijat..
                    </Text>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Image
                            style={{width:200, textAlign:'center'}} 
                            source={require('../../assets/images/worker.svg')} />
                    </View>  
                </Content>          
            </Container>
        )
    }
}