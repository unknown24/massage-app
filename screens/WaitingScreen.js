import React from 'react';
import initApp from '../library/firebase/firebase';
import { AsyncStorage, Image } from "react-native";

import SearchScreen from '../components/sub_screen/SearchScreeen'
import WaitTransferScreen from '../components/sub_screen/WaitTransferScreen'
import OnTheWayScreen from '../components/sub_screen/OnTheWayScreen'
import DoingScreen from '../components/sub_screen/DoingScreen'
import FinishScreen from '../components/sub_screen/FinishScreen'
import { getLastString } from '../library/String'
import { Toast } from 'native-base';

const firebase = initApp()
const dbh      = firebase.firestore();

export default class WaitingScreen extends React.Component {
    state = {
        screen        : 'search',   // waiting_transfer , on_the_way , doing, finish
        currentPesanan: null
    }

    static navigationOptions = {
      tabBarVisible: false,
      header       : null,
    };

    async componentDidMount(){

      this.user_id = await AsyncStorage.getItem("user_id")
      this._listenToPesanan(this)

    }

    _listenToPesanan(that){

        dbh.collection("pesananClient").where("user_id", "==", that.user_id)
          .onSnapshot(function(querySnapshot) {
            querySnapshot.docChanges().forEach(function(change) {

              if (change.type === "added" || change.type === "modified") {

                  var pesanan = [];
                  querySnapshot.forEach(function(doc) {
                    
                    pesanan.push({
                      id_pesanan: getLastString(doc._document.proto.name),
                      user_id   : doc.data().user_id,
                      partner_id: doc.data().partner_id,
                      status    : doc.data().status
                    })
    
                  })
  
                  that.setState({ 
                      currentPesanan: pesanan.length > 0? pesanan[0]: null,
                      screen        : pesanan[0].status
                  })     

              } 

            })
        })
  
      }


    handleBatalPesan(){
      fetch('http://apis.blindmassage.id/massage-app-server/apis/client/batalkanPesanan.php?id_pesanan='+ this.state.currentPesanan)
        .then(res => res.json())
        .then(res => {
          console.log(this.state.currentPesanan ,res)

          if (res.code == 400) {
            Toast.show({
              text: JSON.stringify(res),
              buttonText: 'Okay'
            })
          } else {
            this.props.navigation.navigate('Pesan')
          }
        })
    }


    render(){
        if (this.state.screen == 'waiting_transfer') {
            return <WaitTransferScreen />
        } else if (this.state.screen == 'on_the_way') {
            return <OnTheWayScreen />
        } else if (this.state.screen == 'doing') {
            return <DoingScreen />
        } else if (this.state.screen == 'finish') {
            return <FinishScreen />
        } else {
            return <SearchScreen onBatalPesan={this.handleBatalPesan.bind(this)} />
        } 
    }
}