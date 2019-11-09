import { AsyncStorage } from 'react-native';
import queryString from 'query-string';
import NavigationService from '../screens/navigation/NavigationService';
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
  INSERT_LOG,
  SYNC_LOG,
  UPDATE_STATE_PESANAN,
} from '../../constants/ActionTypes';
import { requestGET } from '../../library/api-request';

function gotoHome(res) {
  NavigationService.navigate(SCREEN.HOME);
  return {
    type: GOTO_HOME,
    payload: res,
  };
}

export function gotoShowLocation(res) {
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


export function getLog() {
  return (dispatch) => AsyncStorage.getItem('log')
    .then((data) => dispatch({
      type: SYNC_LOG,
      payload: data,
    }));
}

function insertLog(data) {
  return (dispatch) => AsyncStorage.setItem('log', JSON.stringify(data, null, 2))
    .then(() => dispatch({
      type: INSERT_LOG,
      payload: data,
    }));
}



export function pesan(param) {
  return (dispatch) => {
    dispatch({ type: PESAN });
    fetch(`${url}massage-app-server/order.php`, {
      method: 'POST',
      body: JSON.stringify(param),
    })
    .then(res => res.text())
    .then((res) => {
      dispatch({
        type: PESAN_SUCCESS,
        payload: res,
      });
      dispatch(insertLog(res));
      dispatch(gotoCariTerapis());
    })
    .catch((error) => {
      console.log(error)
      dispatch({
          type: PESAN_FAIL,
          payload: error,
        });

        dispatch(insertLog(error));
      });
  };
}

export function startTimerSearch() {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch({
        type: UPDATE_STATE_PESANAN,
        payload: 'timeout',
      });
      fetch(`https://firestore.googleapis.com/v1/projects/massage-blind/databases/(default)/documents/pesanan/${getState().current_id_pesanan}?key=AIzaSyBglHISyB36SibOQ2MWH_3SEN-MKwc4_1k`, { method: 'DELETE' })
        .then((res) => res.json()).then((res) => console.log(res));
    }, 30000);
  };
}


export function batalkanPesanan(isOnSearch = 0) {
  return (dispatch, getState) => {
    const { current_id_pesanan } = getState();
    dispatch({ type: BATALKAN_PESANAN_USER });

    requestGET(`${url}massage-app-server/apis/client/batalkanPesanan.php?id_pesanan=${current_id_pesanan}&isOnSearch=${isOnSearch}`)
      .then((res) => {
        if (res.code === 200) {
          dispatch(gotoHome());
        } else {
          dispatch({
            type: BATALKAN_PESANAN_USER_FAIL,
            payload: res,
          });
          dispatch(gotoHome());
        }
        dispatch(insertLog(res));
      })
      .catch((error) => {
        dispatch({
          type: BATALKAN_PESANAN_USER_FAIL,
          payload: error,
        });
        dispatch(insertLog(error));
      });
  };
}
