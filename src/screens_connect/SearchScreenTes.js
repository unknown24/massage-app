import { connect } from 'react-redux';
import { compose } from 'redux';
import { batalkanPesanan, gotoShowLocation, startTimerSearch } from '../actions/ActionCreators';
import Search from '../../screens/SearchScreen';
import WrapperWithListening from '../screens/hoc/ListenPesanan';


const mapStateToProps = (state) => ({
  tipe: state.current_state_pesanan,
  data: state,
  user_id: 'u1',
});

const mapDispatchToProps = {
  onBatalPesan: batalkanPesanan.bind(null, 1),
  onChangeEvent: (res) => gotoShowLocation(res),
  onMounted: startTimerSearch,
};


const composedeWithListening = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WrapperWithListening,
);

export default composedeWithListening(Search);
