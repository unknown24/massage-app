import { connect } from 'react-redux';
import { batalkanPesanan } from '../actions/ActionCreators';
import ShowLocation from '../../screens/ShowLocation';

const mapStateToProps = (state) => ({
  data: state.data,
  layanan: [],
  type: 'terapis',
  kontak: '0909',
  posisi: 'dsadsa',
});

const mapDispatchToProps = { onBatalkan: batalkanPesanan };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShowLocation);
