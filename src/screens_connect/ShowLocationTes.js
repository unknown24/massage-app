import { connect } from 'react-redux';
import { batalkanPesanan } from '../actions/ActionCreators.ts';
import ShowLocation from '../../screens/ShowLocation';

const mapStateToProps = (state) => ({
  data: state.data,
  layanan: [],
  type: 'terapis',
  nama: 'agus suyono',
  kontak: '0909',
  posisi: state.current_pesanan.posisi,
});

const mapDispatchToProps = { onBatalkan: batalkanPesanan.bind(null, 0) };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowLocation);
