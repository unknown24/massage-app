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
  LOAD_USER_DETAIL,
  LOAD_USER_DETAIL_FAILED,
  LOAD_USER_DETAIL_SUCCESS
} from '../../constants/ActionTypes';
import { requestGET } from '../../library/api-request';

// data source

interface Thunk {
  (dispatch: (data:Dispatch)=>void, getState: Function):object;
}

interface Dispatch {
  type:string;
  payload?:any;
}

export interface ResDetail{
  [index: number]: {
    id: string,
    email: string,
    telepon: string,
    password: string,
    tipe: string
  };
}

function getDetailTerapis(id:string):Thunk{
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_USER_DETAIL,
    })
    fetch(`${url}apps/users/detail/${id}`)
      .then(r => r.json())
      .then((r:ResDetail) => {
        dispatch({
          type: LOAD_USER_DETAIL_SUCCESS,
          payload: r,
        })
      })
      .catch(err=>{
        dispatch({
          type: LOAD_USER_DETAIL_FAILED
        })
      })
    return {}
  }
} 



export function gotoHome(res:any) {
  NavigationService.navigate(SCREEN.HOME);
  return {
    type: GOTO_HOME,
    payload: res,
  };
}

export function gotoShowLocation(res:any) {
  NavigationService.navigate(SCREEN.SHOW_LOCATION);
  return {
    type: GOTO_SHOW_LOCATION,
    payload: res,
  };
}

function gotoCariTerapis(tipe:string) {
  NavigationService.navigate(SCREEN.CARI_TERAPIS);
  return {
    type: GOTO_CARI_TERAPIS,
    payload:tipe,
  };
}


export function getLog() {
  return (dispatch:any) => AsyncStorage.getItem('log')
    .then((data) => dispatch({
      type: SYNC_LOG,
      payload: data,
    }));
}

function insertLog(data:any) {
  return (dispatch:any) => AsyncStorage.setItem('log', JSON.stringify(data, null, 2))
    .then(() => dispatch({
      type: INSERT_LOG,
      payload: data,
    }));
}



export function pesan(param:any) {
  return (dispatch:any) => {
    dispatch({ type: PESAN });
    dispatch(gotoCariTerapis('search'));
    fetch(`${url}massage-app-server/order.php`, {
      method: 'POST',
      body: JSON.stringify(param),
    })
    .then(res => res.json())
    .then((res) => {
      dispatch({
        type: PESAN_SUCCESS,
        payload: res,
      });
      dispatch(insertLog(res));
    })
    .catch((error) => {
      dispatch({
          type: PESAN_FAIL,
          payload: error,
        });

        dispatch(insertLog(error));
      });
  };
}

export function startTimerSearch() {
  return (dispatch:any, getState:any) => {
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
  return (dispatch:any, getState:any) => {
    const { current_id_pesanan } = getState();
    dispatch({ type: BATALKAN_PESANAN_USER });

    requestGET(`${url}massage-app-server/apis/client/batalkanPesanan.php?id_pesanan=${current_id_pesanan}&isOnSearch=${isOnSearch}`)
      .then((res) => {
        if (res.code === 200) {
          dispatch(gotoHome(res));
        } else {
          dispatch({
            type: BATALKAN_PESANAN_USER_FAIL,
            payload: res,
          });
          dispatch(gotoHome(res));
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
