import React from 'react';
import { Icon } from 'native-base';

export function requestGET(api) {
  try {
    return fetch(`${api}`)
      .then((res) => res.json());
  } catch (error) {
    return new Promise(() => {
      throw error;
    });
  }
}

function loadProduct() {
  let resText;
  try {
    return fetch('http://apis.blindmassage.id/massage-app-server/apis/getAllProduct.php')
      .then((res) => {
        resText = res.text();
        return resText;
      })
      .then((res) => JSON.parse(res));
  } catch (error) {
    return {
      status: false,
      message: error + resText,
    };
  }
}

function mapProduct(obj) {
  return {
    id: obj.id,
    icon: <Icon name={obj.icon} />,
    name: obj.name,
    image: obj.image,
    desc: obj.description,
  };
}


function loadPricingProduct(id) {
  let resText;
  try {
    return fetch(`http://apis.blindmassage.id/massage-app-server/apis/client/getPricingProduct.php?pid=${id}`)
      .then((res) => {
        resText = res.text();
        return resText;
      })
      .then((res) => JSON.parse(res));
  } catch (error) {
    return {
      status: false,
      message: error + resText,
    };
  }
}


export function getProduct() {
  return loadProduct()
    .then((data) => ({
      status: data.status,
      data: data.data.map(mapProduct),
    }));
}


export function getProductPricing(id) {
  return loadPricingProduct(id)
    .then((respon) => ({
      status: respon.status,
      data: respon.data,
    }));
}
