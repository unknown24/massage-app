import NavigationService from '../navigations/NavigationService';
import { baseURL } from '../../constants/Screen';

import {
  BATALKAN_PESANAN_USER,
  BATALKAN_PESANAN_USER_FAIL,
  BATALKAN_PESANAN_USER_SUCCESS,
} from './ActionTypes';


function gotoHome(res) {
  NavigationService.navigate('juara');
  return {
    type: BATALKAN_PESANAN_USER_SUCCESS,
    payload: res,
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
