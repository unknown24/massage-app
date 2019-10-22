import { connect } from 'react-redux';
import batalkanPesanan from '../actions/ActionCreators';
import FullScreen from '../../screens/FullScreen';

const mapStateToProps = (state) => ({
  data: state.data,
  layanan: [],
  type: 'terapis',
  kontak: '0909',
  posisi: 'dsadsa',
  onBatakan: () => {},
});

const mapDispatchToProps = { onBatakan: batalkanPesanan };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FullScreen);
