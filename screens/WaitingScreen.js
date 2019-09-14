import React from 'react';
import initApp from '../library/firebase/firebase';

import SearchScreen from '../components/sub_screen/SearchScreeen'
import WaitTransferScreen from '../components/sub_screen/WaitTransferScreen'
import OnTheWayScreen from '../components/sub_screen/OnTheWayScreen'
import DoingScreen from '../components/sub_screen/DoingScreen'
import FinishScreen from '../components/sub_screen/FinishScreen'
import { getLastString } from '../library/String'

const firebase = initApp()
const dbh      = firebase.firestore();
const user_id  = 'u1'

export default class WaitingScreen extends React.Component {
    state = {
        screen : 'search'// waiting_transfer , on_the_way , doing, finish
    }

    componentDidMount(){
      this._listenToPesanan(this)
    }

    _listenToPesanan(that){

        dbh.collection("pesananClient").where("user_id", "==", user_id)
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


    render(){
        console.log(this.state.screen)
        if (this.state.screen == 'waiting_transfer') {
            return <WaitTransferScreen />
        } else if (this.state.screen == 'on_the_way') {
            return <OnTheWayScreen />
        } else if (this.state.screen == 'doing') {
            return <DoingScreen />
        } else if (this.state.screen == 'finish') {
            return <FinishScreen />
        } else {
            return <SearchScreen />
        } 
    }
}