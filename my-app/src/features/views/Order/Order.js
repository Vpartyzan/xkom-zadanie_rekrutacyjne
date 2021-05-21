import React from 'react';
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
      table: [
        ['','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','',''], 
      ],
      order: []
    }
  }

  componentDidMount() {
    const { loadSeats } = this.props;
    loadSeats();
  }
  
  prepareHall() {    
    const { seats } = this.props;
    const { table } = this.state;

    seats.map( seat => {
      switch(String(seat.cords.x)) {
        case '0':
          table[0].splice(seat.cords.y, 1, seat);
          break
        case '1':
          table[1].splice(seat.cords.y, 1, seat);
          break
        case '2':
          table[2].splice(seat.cords.y, 1, seat);
          break
        case '3':
          table[3].splice(seat.cords.y, 1, seat);
          break
        case '4':
          table[4].splice(seat.cords.y, 1, seat);
          break
        case '5':
          table[5].splice(seat.cords.y, 1, seat);
          break
        case '6':
          table[6].splice(seat.cords.y, 1, seat);
          break
        case '7':
          table[7].splice(seat.cords.y, 1, seat);
          break
        case '8':
          table[8].splice(seat.cords.y, 1, seat);
          break
        case '9':
          table[9].splice(seat.cords.y, 1, seat);
          break
      }
    });
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

  tableCell(seat) {
    for (let i=0; i < 14; i++) {
      if (seat == '') {
        return <TableCell className={styles.empty}></TableCell>
      } else {
        return <TableCell className={styles.y}>{this.prepareSeat(seat)}</TableCell>
      }
    }; 
  }

  tableRow() {
    const { table } = this.state;

    for (let row in table) {
      return <TableRow>{table[row].map( seat => this.tableCell(seat))}</TableRow>     
    };
  }

  setSeat(e) {
    const { order } = this.state;

    e.preventDefault();

    (order.some( item => item === e.target.textContent)) 
      ? this.setState({ order: order.filter( seat => seat !== e.target.textContent) })
      : this.setState({ order: [ ...order, e.target.textContent ] });  
  }

  reserved(e) {
    const { order } = this.state;
    const { seats, addSeat } = this.props;

    //e.preventDefault();

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
    const { table } = this.state;
    
    this.prepareHall();    

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