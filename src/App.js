import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import tawkTo from 'tawkto-react';

import Main from './components/mainPage';
import Admin from './components/admin';
import Email from './components/email';
import Clients from './components/clients';
import Control from './components/admin/control';
import Mailer from './components/admin/mailer';
import Scrollyteller from './components/hydrationPage/Scrollyteller';
import Dashboard from './components/Dashboard'
import Editor from './components/Editor'

import useTracking from './components/useTracking';

import 'intersection-observer';
import './styles.css';

const tawkToPropertyId = '60354cb7918aa2612741f1d4';
const tawkToKey = '1ev837bni';

tawkTo(tawkToPropertyId, tawkToKey);

export const InternalApp = () => {
  useTracking('G-GF5FNTGLZL');
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/user/:email" component={Main} />
      <Route path="/admin/mailer" component={Mailer} />
      <Route path="/admin/control/:email" component={Control} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin/editor/:pageId" component={Editor} />
      <Route path="/admin" component={Admin} />
      <Route path="/email" component={Email} />
      <Route path="/list" component={Clients} />
      <Route exact path="/page/wetestonline.com/hydration" component={Scrollyteller} />
      {/* <Route path="/*" component={Main} /> */}
    </Switch>
  );
};
const App = ()=> {
  return (
    <>
      <BrowserRouter>
        <InternalApp />
      </BrowserRouter>
    </>
  );
}
export default /*withAuthenticator(App); */ App; 
