import queryString from 'query-string';
import NavigationService from '../navigations/NavigationService';
import url from '../../constants/API';
import { SCREEN } from '../../constants/Screen';

import {
  BATALKAN_PESANAN_USER,
  BATALKAN_PESANAN_USER_FAIL,
  BATALKAN_PESANAN_USER_SUCCESS,
  PESAN,
  PESAN_FAIL,
  PESAN_SUCCESS,
} from './ActionTypes';


function gotoHome(res) {
  NavigationService.navigate(SCREEN.SHOW_LOCATION);
  return {
    type: BATALKAN_PESANAN_USER_SUCCESS,
    payload: res,
  };
}

function gotoShowLocation(res) {
  NavigationService.navigate(SCREEN.SHOW_LOCATION);
  return {
    type: PESAN_SUCCESS,
    payload: res,
  };
}


function requestGET(api) {
  try {
    return fetch(`${api}`)
      .then((res) => res.json());
  } catch (error) {
    return new Promise(() => {
      throw error;
    });
  }
}


export function pesan(param) {
  return (dispatch) => {
    dispatch({ type: PESAN });
    const paramz = queryString.stringify(param);
    requestGET(`${url}massage-app-server/order.php?${paramz}`)
      .then((res) => {
        dispatch(gotoShowLocation(res));
      })
      .catch((error) => {
        dispatch({
          type: PESAN_FAIL,
          payload: error,
        });
      });
  };
}

export default function batalkanPesanan() {
  return (dispatch) => {
    dispatch({ type: BATALKAN_PESANAN_USER });

    try {
      fetch(`${url}https://jsonplaceholder.typicode.com/todos/1`)
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
