import { connect } from 'react-redux';
import batalkanPesanan from '../../src/actions/ActionCreators';
import FullScreen from '../FullScreen';

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
