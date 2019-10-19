import NavigationService from '../navigations/NavigationService';
import { baseURL } from '../../library/constant';

import {
  BATALKAN_PESANAN_USER,
  BATALKAN_PESANAN_USER_FAIL,
  BATALKAN_PESANAN_USER_SUCCESS,
  GOTO_SHOW_LOCATION,
} from './ActionTypes';


import { SCREEN } from '../../library/constant' 

function gotoHome(res) {
  NavigationService.navigate('juara');
  return {
    type: BATALKAN_PESANAN_USER_SUCCESS,
    payload: res,
  };
}

function gotoShowLocation(param){
  NavigationService.navigate('juara');
  return {
    type: GOTO_SHOW_LOCATION,
    payload: param,
  };
}

export default function batalkanPesanan() {
  return (dispatch) => {
    dispatch({ type: BATALKAN_PESANAN_USER });

    try {
      fetch(`${baseURL}https://jsonplaceholder.typicode.com/todos/1`)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          dispatch(gotoHome());
        });
    } catch (error) {
      dispatch({
        type: BATALKAN_PESANAN_USER_FAIL,
        payload: error,
      });
    }
  };
}
