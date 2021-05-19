import React from 'react';
import { Switch, Route} from 'react-router-dom';

import { StylesProvider } from '@material-ui/core/styles';

import StartPage from './features/views/StartPage/StartPage.js';
import Order from './features/views/Order/OrderContainer';

function App() {
  return (
    <StylesProvider injectFirst>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={StartPage} />
        <Route exact path={`${process.env.PUBLIC_URL}/order`} component={Order} />
      </Switch>
    </StylesProvider>    
  );
}

export default App;
