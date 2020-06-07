import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path='/' exact />
        <Route component={CreatePoint} path='/cadastro' />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
