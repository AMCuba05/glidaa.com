import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import tawkTo from "tawkto-react";

import Main from "./components/mainPage";
import Admin from "./components/admin";
import Email from "./components/email";
import Clients from "./components/clients";
import Control from "./components/admin/control";
import Dashboard from "./components/admin/dashboard";

import useTracking from "./components/useTracking";

import "intersection-observer";
import "./styles.css";

const tawkToPropertyId = "60354cb7918aa2612741f1d4";
const tawkToKey = "1ev837bni";

tawkTo(tawkToPropertyId, tawkToKey);

export const InternalApp = () => {
  useTracking("G-GF5FNTGLZL");
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/user/:email" component={Main} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin/control/:email" component={Control} />
      <Route path="/admin" component={Admin} />
      <Route path="/email" component={Email} />
      <Route path="/list" component={Clients} />
      <Route path="/*" component={Main} />
    </Switch>
  );
};
export default function App() {
  return (
    <BrowserRouter>
      <InternalApp />
    </BrowserRouter>

  );
}
