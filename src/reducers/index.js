import { BATALKAN_PESANAN_USER_SUCCESS } from '../actions/ActionTypes';

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

export default todoApp;
