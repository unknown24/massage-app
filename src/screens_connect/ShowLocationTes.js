import _ from 'lodash';
import { connect } from 'react-redux';
import * as AllFunction from '../actions/ActionCreators.ts';
import ShowLocation from '../../screens/ShowLocation';

/**
 *
 * [index: number]: {
    id: string,
    email: string,
    telepon: string,
    password: string,
    tipe: string
  };
 */

// state[0].current_terapis.email
const mapStateToProps = (state) => {
  const nama = _.get(state, 'current_terapis[0].email', '');

  return {
    data: state.data,
    layanan: [],
    type: 'terapis',
    nama,
    kontak: state.current_terapis.telepon,
    posisi: state.current_pesanan.posisi,
    total: '5000',
    hargaJarak: '2000',
    jarak: '1000',
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBatalkan: () => dispatch(AllFunction['batalkanPesanan'](0)),
    onChangeDebug: (data) => dispatch(data),
    runDebug: (obj) => {
      if (obj.fn in AllFunction) {
        return dispatch(AllFunction[obj.fn]());
      }
      return {
        type: 'TESTING',
      }
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ShowLocation);
