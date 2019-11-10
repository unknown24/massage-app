import { connect } from 'react-redux';
import { batalkanPesanan } from '../actions/ActionCreators.ts';
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

const mapStateToProps = (state) => ({
  data: state.data,
  layanan: [],
  type: 'terapis',
  nama: state.current_terapis.email,
  kontak: state.current_terapis.telepon,
  posisi: state.current_pesanan.posisi,
});

const mapDispatchToProps = { onBatalkan: batalkanPesanan.bind(null, 0) };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowLocation);
