import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import styles from './styles.module.css';

class StartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      quantity: '',
      table: [
        ['','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','',''],
        ['','','','','','','','','','','','','','',''], 
      ],
    }
  }

  static propTypes = {
    seats: PropTypes.array,
    loadTable: PropTypes.func,
    loadSeats: PropTypes.func,
    addQuantitySeats: PropTypes.func,
  }

  componentDidMount() {
    const { loadSeats } = this.props;
    loadSeats();    
  }

  prepareHall() {    
    const { seats, loadTable } = this.props;
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
    
    loadTable(table);
  }

  handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  }

  quantityChange = (event) => {
    event.preventDefault();

    this.setState({ ...this.state, quantity: event.target.value }); 
  }

  submit = () => {
    const { addQuantitySeats } = this.props;
    const { checked, quantity } = this.state;

    if ( checked && quantity < 5) {
      this.prepareHall();
      addQuantitySeats({checked, quantity});
      this.props.history.push('/order')
    } else if (!checked && quantity <= this.freeSeats()) {
      this.prepareHall();
      addQuantitySeats({checked, quantity});
      this.props.history.push('/order')
    }  
  }

  freeSeats() {
    const { seats } = this.props;
    const freeSeats = seats.filter( seat => seat.reserved === false);

    return freeSeats.length - 1;
  }

  render() {

    return (
      <Container maxWidth='sm' className={styles.container}>
        <Card className={styles.card}>
          <CardContent className={styles.card}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              spacing={3}
            >
              <Grid item>
                <TextField id="standard-basic" label="Liczba miejsc" onChange={e => this.quantityChange(e)}/>
              </Grid>
              {<Alert severity="info">Wolnych miejsc: {this.freeSeats()}</Alert>}
              <Grid item>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.checked}
                      onChange={ e => this.handleChange(e)}
                      name="checked"
                      color="primary"
                    />
                  }
                  label="Czy miejsca mają być obok siebie? (max. 4)"
                />
              </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={e => this.submit(e)}
                >Wybierz miejsca</Button>
              </Grid>
              {(this.state.checked && this.state.quantity > 4) ? <Alert severity="warning">maksymalna liczba miejsc obok: 4</Alert> : ''}
              {(this.state.quantity !== '' && this.state.quantity <= 0) ? <Alert severity="warning">minimalna liczba miejsc: 1</Alert> : ''}
              {(this.state.quantity !== '' && this.state.quantity > this.freeSeats()) ? <Alert severity="warning">Liczba wybranych miejsc, nie może być większa niż liczba wolnych miejsc.</Alert> : ''}            
            </Grid>          
          </CardContent>        
        </Card>      
      </Container>
    );
  }
}

export default StartPage;