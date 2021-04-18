import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import tawkTo from 'tawkto-react';

import Main from './components/mainPage';
import Email from './components/email';
import Clients from './components/clients';
import Scrollyteller from './components/hydrationPage/components/Explainerpage';
import Logout from './components/Logout';
import Upload from './components/Upload';
import AdminRoutes from './components/admin/AdminRoutes'

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
      <AdminRoutes/>
      <Route path="/email" component={Email} />
      <Route path="/list" component={Clients} />
      <Route path="/upload" component={Upload} />
      <Route path="/logout" component={Logout} />
      <Route exact path="/page/wetestonline.com/hydration" component={Scrollyteller} />
      {/* <Route path="/*" component={Main} /> */}
    </Switch>
  );
};
const App = () => {
  return (
    <>
      <BrowserRouter>
        <InternalApp />
      </BrowserRouter>
    </>
  );
};
export default /*withAuthenticator(*/ App /*)*/;
