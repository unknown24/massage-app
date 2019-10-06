import React from 'react'
import PesananScreen from './PesananScreen'


export default class SearchScreen extends React.Component{

   
    state = {
        tipe : 'search'
    }
    
    componentDidMount(){

        // kasih waktu 5 menit pencarian
        let timeOut = 60000 * 5 // 5 menit
        timeOut = 10000 // 10 detik

        setTimeout(()=>{
            // delete pencarian dan balikan ke screen maaf
            // this.setState({tipe: 'timeout'})
        }, timeOut)

    }
    
    render(){
        return(
            <PesananScreen tipe={this.state.tipe} />
        )
    }
}