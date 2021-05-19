import React from 'react';
import { NavLink } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import styles from './styles.module.css';

function StartPage() {
  const [state, setState] = React.useState({
    checked: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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
              <TextField id="standard-basic" label="Liczba miejsc" />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={state.checked}
                    onChange={handleChange}
                    name="checked"
                    color="primary"
                  />
                }
                label="Czy miejsca mają być obok siebie?"
              />
            </Grid>
            <Grid item>
              <Button component={NavLink} variant="contained" color="primary" to={`${process.env.PUBLIC_URL}/order`}>Wybierz miejsca</Button>
            </Grid>            
          </Grid>          
        </CardContent>        
      </Card>      
    </Container>
  );
}

export default StartPage;