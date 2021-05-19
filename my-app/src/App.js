import React from 'react';
import { Switch, Route} from 'react-router-dom';

import StartPage from './features/views/StartPage/StartPage.js';

function App() {
  return (
    <Switch>
      <Route path='/' exact component={StartPage} />
    </Switch>
  );
}

export default App;
