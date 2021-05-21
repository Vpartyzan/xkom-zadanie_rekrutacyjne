import React from 'react';
import styles from './styles.module.css';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

class Success extends React.Component {

  render() {
    const { seats } = this.props;

    return (
      <Container maxWidth='sm' className={styles.container}>
        <Card className={styles.card}>
          <CardContent className={styles.card}>
            <Grid
              container
              direction="column"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <h3>Twoja rezerwacja przebiegła pomyślnie!</h3>
                <p>Wybrałeś miejsca:</p>
                {seats.map( seat => <p key={seat.id}>- rząd x{seat.cords.x}, miejsce y{seat.cords.y} ({seat.id})</p>)}              
              </Grid>
              <Grid item>
                <h3>Dziękujemy! <br/>W razie problemów prosimy o kontakt z działem administracji.</h3>
              </Grid>         
            </Grid>
          </CardContent>
        </Card>
      </Container>  
    )
  }
}

export default Success;