import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import CSVFileReader from '../../helper/CSVFileReader';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure(awsconfig);
var clear = false;
const Admin = () => {
  const [exist, setExist] = useState(-1);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    clear = false
    return () => {
      clear = true;
      clearInterval(interval);
    };
  }, []);
  const Prueba = () => {
    const isExist = Auth?.user?.signInUserSession?.idToken ? 0 : -1;
    if (exist !== isExist) {
      if (!clear) {
        setIsAdmin(Auth.user.signInUserSession.idToken.payload['cognito:groups']?.includes('Admin'));
        setExist(isExist);
      }
      clearInterval(interval);
      console.log('isExist',isExist,clear);
    }
  };
  var interval = setInterval(Prueba, 1000);
  return (
    <>
      <AmplifySignOut />
      {exist === 0 ? isAdmin ? <CSVFileReader></CSVFileReader> : <Redirect to="/" /> : null}
      
    </>
  );
};

export default withAuthenticator(Admin);
