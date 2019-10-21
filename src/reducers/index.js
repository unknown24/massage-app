import { combineReducers } from 'redux';
import update from 'immutability-helper';
import extractResponPesan from '../../library/ExtractRespons';

import {
  BATALKAN_PESANAN_USER_SUCCESS,
  PESAN,
  PESAN_SUCCESS,
  PESAN_FAIL,
} from '../actions/ActionTypes';

const initialState = {
  current_id_pesanan: null,
  current_state_pesanan: null,
  screens: {},
  raw_data: {
    pesan: {},
  },
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


function pesanScreen(state = initialState, action) {
  switch (action.type) {
    case PESAN:
      return {
        ...state,
        loader: true,
      };
    case PESAN_SUCCESS:

      return update(state, {
        current_id_pesanan: { $set: extractResponPesan(action.payload).data.id_pesanan },
        current_state_pesanan: { $set: 'search' },
        raw_data: { pesan: { $set: action.payload } },
      });


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
