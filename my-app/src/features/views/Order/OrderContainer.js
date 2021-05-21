import { connect } from 'react-redux';
import { getSeats, getRequests, loadSeatsRequest, addSeat } from '../../../redux/orderRedux';

import Order from './Order';

const mapStateToProps = state => ({
  seats: getSeats(state),
  request: getRequests(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  addSeat: (item) => dispatch(addSeat(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);

