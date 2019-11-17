import { connect } from 'react-redux';
import { batalkanPesanan } from '../actions/ActionCreators.ts';
import ShowLocation from '../../screens/ShowLocation';
import _ from 'lodash'

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

 //state[0].current_terapis.email
const mapStateToProps = (state) => {
  console.log(state)
  const nama = _.get(state, 'current_terapis[0].email','') ;

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

const mapDispatchToProps = { onBatalkan: batalkanPesanan.bind(null, 0) };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowLocation);
