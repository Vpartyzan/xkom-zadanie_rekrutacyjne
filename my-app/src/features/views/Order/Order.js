import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

class Order extends React.Component {
  constructor(props) {
    super(props)

    this.state = {      
      order: [],
    }
  }

  static propTypes = {
    seats: PropTypes.array,
    table: PropTypes.array,    
    quantity: PropTypes.array,
    loadSeats: PropTypes.func,
    addSeat: PropTypes.func,
  }

  componentDidMount() {
    const { loadSeats } = this.props;

    loadSeats();    
    this.randomSeats();    
  }

  randomSeats() {
    const { quantity, seats, table } = this.props;
    let tempOrder = [];

    if (quantity[0].quantity > 1) {

      for (let x = 0; x < 10; x++ ) {

        if (tempOrder.length !== +quantity[0].quantity) {
  
          for (let y = 0; y < 15; y++) {
            const randomSeat = table[x][y].id;
      
            if (tempOrder.length !== +quantity[0].quantity) {
  
              if ( quantity[0].checked && randomSeat && seats.some( seat => seat.id === randomSeat && !seat.reserved)) {
                tempOrder.push(randomSeat);
  
                for (let n = 1; n < +quantity[0].quantity; n++) {
  
                  if ( table[x][y+n] && seats.some( seat => seat.id === table[x][y+n].id && !seat.reserved) ) {
                    tempOrder.push(table[x][y+n].id);
                  } else {
                    tempOrder = [];
                  }
                }
              } else if (randomSeat && seats.some( seat => seat.id === randomSeat && !seat.reserved)) {
                tempOrder.push(randomSeat);
              }
            } else {
              this.setState({ order: tempOrder });
              break;
            }
          }
        } else {
          break;
        }
      }
    }    
  } 
  
  
  prepareSeat(seat) {
    const { order } = this.state;

    if (seat.reserved) {
      return <Button key={seat.id} variant="contained" color="secondary" className={styles.seat} disabled>{seat.id}</Button>
    } else if (order.some( item => item === seat.id)) {
      return <Button key={seat.id} variant="contained" className={styles.chosenSeat} onClick={ e => this.setSeat(e)}>{seat.id}</Button>
    } else {
      return <Button key={seat.id} variant="contained" className={styles.seatFree} onClick={ e => this.setSeat(e)}>{seat.id}</Button>
    }
  }

  tableRow() {
    const { table } = this.props;

    for (let row in table) {
      return <TableRow>{table[row].map( seat => this.tableCell(seat))}</TableRow>     
    };
  }

  tableCell(seat) {
    for (let i=0; i < 14; i++) {

      if (seat === '') {
        return <TableCell className={styles.empty}></TableCell>
      } else {
        return <TableCell className={styles.y}>{this.prepareSeat(seat)}</TableCell>
      }
    } 
  }  

  setSeat(e) {
    const { order } = this.state;

    e.preventDefault();

    (order.some( item => item === e.target.textContent)) 
      ? this.setState({ order: order.filter( seat => seat !== e.target.textContent) })
      : this.setState({ order: [ ...order, e.target.textContent ] });  
  }

  reserved() {
    const { order } = this.state;
    const { seats, addSeat } = this.props;

    if (!order.length) {
      alert('You must choose some seat');
    } else {
      seats.map( seat => {        
        if (order.some( item => item === seat.id)) {
          seat.reserved = 'true';
          addSeat(seat);
        } 
      });
    }
  }

  render() {
    const { table } = this.props;       

    return (
      <Container maxWidth='sm' className={styles.container}>
        <Paper variant="outlined">
          <Table aria-label="simple table">
            <TableBody>
              {table.map( row => (
                <TableRow>
                  {row.map( seat => this.tableCell(seat))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid container direction="row" justify="space-evenly" alignItems="center" className={styles.helper}>
            <Grid item>
              <Button variant="contained" className={styles.seatFree} /> - Miejsca dostępne
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" className={styles.seat} disabled/> - Miejsca zarezerwowane
            </Grid>
            <Grid item>
              <Button variant="contained" className={styles.chosenSeat} /> - Twój wybór
            </Grid>
            <Grid item>
              <Button 
                component={NavLink} 
                to={`${process.env.PUBLIC_URL}/success`} 
                variant="contained" color="primary" 
                onClick={ (e) => this.reserved(e)}
              >Rezerwuj</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>      
    )
  };
}

export default Order;