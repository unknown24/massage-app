import React from "react";
import {  Icon } from "native-base";

function loadProduct(){
    let resText
    try {
        return fetch('http://apis.blindmassage.id/massage-app-server/apis/getAllProduct.php')
            .then(res => {
                resText = res.text()
                return resText })
            .then(res => JSON.parse(res))
    } catch (error) {
        return {
            status : false,
            message: error + resText 
        }
    }
    
}

function mapProduct(obj){
    return  {
        id   : obj.id,
        icon : <Icon name={obj.icon} />,
        name : obj.name,
        iamge: obj.image,
        desc : obj.description
    }
}

export  function getProduct(){
    return loadProduct().then(data => ({
        status: data.status,
        data  : data.data.map(mapProduct)
    }) )
}