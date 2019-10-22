import { connect } from 'react-redux';
import { batalkanPesanan } from '../actions/ActionCreators';
import Search from '../../screens/SearchScreen';

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
