import update from 'immutability-helper';
import extractResponPesan from '../../library/ExtractRespons';

import {
  PESAN,
  PESAN_SUCCESS,
  PESAN_FAIL,
  INSERT_LOG,
  SYNC_LOG,
  GOTO_SHOW_LOCATION,
} from '../../constants/ActionTypes';

const initialState = {
  current_id_pesanan: null,
  current_state_pesanan: null,
  current_error: '',
  log_text: '',
  loader: false,
  screens: {},
  raw_data: {
    pesan: {},
  },
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
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
          $set: action.payload[0],
        },
      });

    default:
      return state;
  }
}

export default rootReducer;
