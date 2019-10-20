import { connect } from 'react-redux';
import { batalkanPesanan } from '../../src/actions/ActionCreators';
import Search from '../SearchScreen';

const mapStateToProps = (state) => ({
  tipe: state.current_state_pesanan,
  data: state,
});

const mapDispatchToProps = {
  onBatalPesan: batalkanPesanan,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
