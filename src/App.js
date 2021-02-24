import React from 'react';
import './styles.css';
import 'intersection-observer';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Main from './components/mainPage';
import Admin from './components/admin'
import Email from './components/email'
import Clients from './components/clients'
import Control from './components/admin/control'

export default function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/user/:email" component={Main} />
        <Route path="/admin/control/:email" component={Control} />
        <Route path="/admin" component={Admin} />
        <Route path="/email" component={Email} />
        <Route path="/list" component={Clients} />
      </Switch>
    </BrowserRouter>
  );
}
