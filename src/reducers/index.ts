import update from 'immutability-helper';
import extractResponPesan from '../../library/ExtractRespons';

import {
  PESAN,
  PESAN_SUCCESS,
  PESAN_FAIL,
  INSERT_LOG,
  SYNC_LOG,
  GOTO_SHOW_LOCATION,
  UPDATE_STATE_PESANAN,
  LOAD_USER_DETAIL,
  LOAD_USER_DETAIL_SUCCESS,
  LOAD_USER_DETAIL_FAILED,
  GOTO_CARI_TERAPIS

} from '../../constants/ActionTypes';
import { ResDetail } from '../actions/ActionCreators';
const res = {}

const initialState = {
  current_id_pesanan: '',
  current_state_pesanan: '',
  current_error: '',
  log_text: '',
  loader: false,
  screens: {},
  current_pesanan: {},
  current_terapis: [{
    email:'aep.com',
    telepon: '3239123982',
    
  }],
  raw_data: {
    pesan: {},
  },
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GOTO_CARI_TERAPIS: 
      return  Object.assign({}, state, {current_state_pesanan:action.payload})
    
    case PESAN:

      return update(state, {
        loader: { $set: true },
      });

    case PESAN_SUCCESS:

      return update(state, {
        current_id_pesanan: { $set: extractResponPesan(action.payload).data.id_pesanan },
        current_state_pesanan: { $set: 'search' },
        raw_data: { pesan: { $set: action.payload } },
        loader: { $set: false },
      });


    case PESAN_FAIL:

      return update(state, {
        loader: { $set: false },
        current_error: { $set: action.payload },
      });

    case INSERT_LOG:

      return update(state, {
        log_text: {
          $set: `${state.log_text} -- 
        -- ${JSON.stringify(action.payload, null, 2)}`,
        },
      });

    case SYNC_LOG:

      return update(state, {
        log_text: {
          $set: `${state.log_text} -- 
        -- ${action.payload}`,
        },
      });

    case GOTO_SHOW_LOCATION:
      return update(state, {
        current_id_pesanan: {
          $set: action.payload[0].id_pesanan,
        },
        current_pesanan: {
          $set: action.payload[0],
        },
      });

    case UPDATE_STATE_PESANAN:
      return update(state, {
        current_state_pesanan: {
          $set: action.payload,
        },
      });


    case LOAD_USER_DETAIL_SUCCESS: {
      const data:ResDetail = action.payload
      return update(state, {
        current_terapis : {$set : data}
      });
    }

    default:
      return state;
  }
}

export default rootReducer;
