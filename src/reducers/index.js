import { combineReducers } from 'redux';
import {
  BATALKAN_PESANAN_USER_SUCCESS,
  PESAN,
  PESAN_SUCCESS,
  PESAN_FAIL,
} from '../actions/ActionTypes';

const initialState = {
  data: [],
};

function todoApp(state = initialState, action) {
  switch (action.type) {
    case BATALKAN_PESANAN_USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}

function pesanScreen(state = {}, action) {
  switch (action.type) {
    case PESAN:
      return {
        ...state,
        loader: true,
      };
    case PESAN_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.payload,
      };
    case PESAN_FAIL:
      return {
        ...state,
        loader: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
}


export default combineReducers({
  todoApp,
  pesanScreen,
});
