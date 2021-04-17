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
        <Route path="/admin/mailer" component={Mailer} />
        <Route path="/admin/control/:email" component={Control} />
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/editor/:pageId" component={Editor} />
        <Route path="/admin" component={Admin} />
      </>
    );
  };

  export default withAuthenticator(AdminRoutes);