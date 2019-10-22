import { connect } from 'react-redux';
import Log from '../screens/screens/Log';
import { getLog } from '../actions/ActionCreators';


const mapStateToProps = (state) => ({
  text: state.log_text,
});

const mapDispatchToProps = { onMounted: getLog };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Log);
