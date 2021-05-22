import { connect } from 'react-redux';
import { getSeats, getRequests, getQuantitySeats, loadSeatsRequest, addSeat, getTable } from '../../../redux/orderRedux';

import Order from './Order';

const mapStateToProps = state => ({
  seats: getSeats(state),
  request: getRequests(state),
  quantity: getQuantitySeats(state),
  table: getTable(state),
});

const mapDispatchToProps = dispatch => ({
  loadSeats: () => dispatch(loadSeatsRequest()),
  addSeat: (item) => dispatch(addSeat(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);

