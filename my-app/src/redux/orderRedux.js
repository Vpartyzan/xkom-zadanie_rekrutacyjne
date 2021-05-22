import axios from 'axios';
import { api } from '../settings';

/* selectors */
export const getSeats = ({ seats }) => seats.data;
export const getChosenSeats = ({ seats }) => seats.chosenSeat;
export const getQuantitySeats = ({ seats }) => seats.quantity;
export const getRequests = ({ seats }) => seats.requests;
export const getTable = ({ seats }) => seats.table;

/* action name creator */
const reducerName = 'seats';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_SEATS = createActionName('LOAD_SEATS');
const ADD_SEAT = createActionName('ADD_SEAT');
const QUANTITY_SEATS = createActionName('QUANTITY_SEATS');
const LOAD_TABLE = createActionName('LOAD_TABLE');

export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const loadSeats = payload => ({ payload, type: LOAD_SEATS });
export const addSeat = payload => ({ payload, type: ADD_SEAT });
export const addQuantitySeats = payload => ({ payload, type: QUANTITY_SEATS });
export const loadTable = payload => ({ payload, type: LOAD_TABLE});

/* thunk creators */
export const loadSeatsRequest = () => {
  return async dispatch => {

    try {
      let res = await axios.get(`${api.url}/seats`);
      dispatch(loadSeats(res.data));

    } catch(e) {
      dispatch(errorRequest({ name: 'LOAD_SEATS', error: e.message }));
    }

  };
};

/* INITIAL STATE */

const initialState = {
  data: [],
  table: [],
  chosenSeat: [],
  quantity: [],
  requests: [],
};

/* reducer */
export default function reducer(statePart = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SEATS: 
      return { ...statePart, data: [...action.payload] };
    case LOAD_TABLE:
      return { ...statePart, table: [...action.payload] };
    case ADD_SEAT: 
      return { ...statePart, chosenSeat: [...statePart.chosenSeat, action.payload] };
    case QUANTITY_SEATS:
      return { ...statePart, quantity: [...statePart.quantity, action.payload] };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
    default:
      return statePart;
  }
}