import { connect } from 'react-redux';
import { pesan } from '../../src/actions/ActionCreators';
import Pesan from '../Pesan';

const mapDispatchToProps = { onPesan: pesan };

export default connect(
  null,
  mapDispatchToProps,
)(Pesan);
