import React from 'react'
import Admin from './';
import Control from './control';
import Mailer from './mailer';
import Dashboard from '../Dashboard';
import Editor from '../Editor';
import { Route } from 'react-router-dom';

import { withAuthenticator } from '@aws-amplify/ui-react';

const AdminRoutes = () => {
    return (
      <>
        <Route exact path="/admin/mailer" component={Mailer} />
        <Route exact path="/admin/control/:email" component={Control} />
        <Route exact path="/admin/dashboard" component={Dashboard} />
        <Route exact path="/admin/editor"/*/:pageId"*/ component={Editor} />
        <Route exact path="/admin" component={Admin} />
      </>
    );
  };

  export default /*withAuthenticator(*/AdminRoutes/*)*/;