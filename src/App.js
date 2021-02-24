import React from 'react';
import './styles.css';
import 'intersection-observer';
import { Switch, Route } from 'react-router-dom';
import tawkTo from "tawkto-react";
import Main from './components/mainPage';
import Admin from './components/admin'
import Email from './components/email'
import Clients from './components/clients'
import Control from './components/admin/control'

/* import ReactGA from 'react-ga';
ReactGA.initialize('G-GF5FNTGLZL');
ReactGA.pageview(window.location.pathname + window.location.search); */
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'G-GF5FNTGLZL'
};

TagManager.initialize(tagManagerArgs)
const tawkToPropertyId = '60354cb7918aa2612741f1d4'
const tawkToKey = '1ev837bni'

tawkTo(tawkToPropertyId, tawkToKey)

export default function App() {


  return (
    <>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/user/:email" component={Main} />
        <Route path="/admin/control/:email" component={Control} />
        <Route path="/admin" component={Admin} />
        <Route path="/email" component={Email} />
        <Route path="/list" component={Clients} />
      </Switch>
    </>
  );
}
