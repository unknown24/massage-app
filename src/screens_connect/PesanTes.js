import { connect } from 'react-redux';
import { pesan } from '../actions/ActionCreators';
import Pesan from '../../screens/Pesan';

const mapDispatchToProps = { onPesan: pesan };

export default connect(
  null,
  mapDispatchToProps,
)(Pesan);
