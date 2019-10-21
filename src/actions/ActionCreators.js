import queryString from 'query-string';
import NavigationService from '../navigations/NavigationService';
import url from '../../constants/API';

import { SCREEN } from '../../constants/Screen';
import {
  BATALKAN_PESANAN_USER,
  BATALKAN_PESANAN_USER_FAIL,
  PESAN,
  PESAN_FAIL,
  PESAN_SUCCESS,
  GOTO_CARI_TERAPIS,
  GOTO_SHOW_LOCATION,
  GOTO_HOME,
} from './ActionTypes';


function gotoHome(res) {
  NavigationService.navigate(SCREEN.HOME);
  return {
    type: GOTO_HOME,
    payload: res,
  };
}

function gotoShowLocation(res) {
  NavigationService.navigate(SCREEN.SHOW_LOCATION);
  return {
    type: GOTO_SHOW_LOCATION,
    payload: res,
  };
}

function gotoCariTerapis() {
  NavigationService.navigate(SCREEN.CARI_TERAPIS);
  return {
    type: GOTO_CARI_TERAPIS,
  };
}


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


export function pesan(param) {
  return (dispatch) => {
    dispatch({ type: PESAN });
    const paramz = queryString.stringify(param);
    requestGET(`${url}massage-app-server/order.php?${paramz}`)
      .then((res) => {
        dispatch({
          type: PESAN_SUCCESS,
          payload: res,
        });
      })
      .catch((error) => {
        dispatch({
          type: PESAN_FAIL,
          payload: error,
        });
      });
  };
}


export function batalkanPesanan() {
  return (dispatch, getState) => {
    const { current_id_pesanan } = getState();

    dispatch({ type: BATALKAN_PESANAN_USER });
    requestGET(`${url}massage-app-server/apis/client/batalkanPesanan.php?id_pesanan=${current_id_pesanan}`)
      .then(() => {
        dispatch(gotoHome());
      })
      .catch((error) => {
        dispatch({
          type: BATALKAN_PESANAN_USER_FAIL,
          payload: error,
        });
      });
  };
}
