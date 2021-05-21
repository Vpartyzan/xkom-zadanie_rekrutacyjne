import { connect } from 'react-redux';
import { getChosenSeats } from '../../../redux/orderRedux';

import Success from './Success';

const mapStateToProps = state => ({
  seats: getChosenSeats(state),
});

export default connect(mapStateToProps)(Success);

