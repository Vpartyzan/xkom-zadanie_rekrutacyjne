import React from 'react';
import styles from './styles.module.css';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import table from '../../data/hallSeats';

class Order extends React.Component {

  componentDidMount() {
    const { loadSeats } = this.props;
    loadSeats();
  }

  prepareSeat = (seat) => {
      if (seat.reserved) {
        return <Button key={seat.id} variant="contained" color="secondary" className={styles.seat}>{seat.id}</Button>
      } else {
        return <Button key={seat.id} variant="contained" className={styles.seat}>{seat.id}</Button>
      }
  }

  tableCell = (seat) => {
    for (let i=0; i < 14; i++) {
      if (seat == '') {
        return <TableCell></TableCell>
      } else {
        return <TableCell>{this.prepareSeat(seat)}</TableCell>
      }
    }; 
  }

  tableRow() {
    for (let row in table) {
      return <TableRow>{table[row].map( seat => this.tableCell(seat))}</TableRow>     
    };
  }

  render() {
    const { seats } = this.props;
    
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
              <Button variant="contained" className={styles.seat} /> - Miejsca dostępne
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" className={styles.seat} /> - Miejsca zarezerwowane
            </Grid>
            <Grid item>
              <Button variant="contained" className={styles.chosenSeat} /> - Twój wybór
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">Rezerwuj</Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>      
    )
  };
}

export default Order;