import { connect } from 'react-redux';
import  { batalkanPesanan } from '../../src/actions/ActionCreators';
import Search from '../SearchScreen';

const mapDispatchToProps = { onPesan: batalkanPesanan };

export default connect(
  null,
  mapDispatchToProps,
)(Search);
