import { connect } from 'react-redux';
import { addQuantitySeats, getQuantitySeats, loadSeatsRequest, loadTable, getSeats } from '../../../redux/orderRedux';

import StartPage from './StartPage';

const mapStateToProps = state => ({
  seats: getSeats(state),
  getQuantitySeats: getQuantitySeats(state),
});

const mapDispatchToProps = dispatch => ({
  addQuantitySeats: (item) => dispatch(addQuantitySeats(item)),
  loadSeats: () => dispatch(loadSeatsRequest()),
  loadTable: (item) => dispatch(loadTable(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);

