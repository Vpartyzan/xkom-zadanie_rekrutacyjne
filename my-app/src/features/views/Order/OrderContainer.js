import { connect } from 'react-redux';
import { getSeats, getRequests, loadSeatsRequest } from '../../../redux/orderRedux';

import Order from './Order';

const mapStateToProps = state => ({
  seats: getSeats(state),
  request: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);

