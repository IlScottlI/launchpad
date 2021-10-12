import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './views/SignIn';
import Home from './views/Home';
import Workspace from './views/Workspace';
import { Router, Redirect } from "@reach/router";
import { createTheme } from '@mui/material/styles';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig, baseUrl } from "./variables/authConfig";
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

window.theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#2C394E',
    },
    secondary: {
      main: '#E84124',
    },
    info: {
      main: '#2196f3',
    },
  },
});

const openAppDrawer = localStorage.getItem("openAppDrawer");
if (openAppDrawer === 'true') {
  window.openAppDrawer = true;
} else {
  window.openAppDrawer = false;
}

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <AuthenticatedTemplate>
        <Router>
          <Workspace path="Workspace" />
          <Workspace path="Workspace/:tab" />
          <Redirect from="/*" to="/LaunchPad/Workspace" noThrow />
          <Redirect from="/launchpad/*" to="/LaunchPad/Workspace" noThrow />
        </Router>
        <Router basepath="/LaunchPad">
          <Redirect from="/*" to="/LaunchPad/Workspace" noThrow />
          <Home path="/:page" baseUrl={baseUrl} />
        </Router>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Router>
          <Workspace path="Workspace" />
        </Router>
        <Router basepath="/LaunchPad">
          <Redirect from="/*" to="/LaunchPad/SignIn" noThrow />
          <SignIn path="/SignIn"/>
        </Router>
      </UnauthenticatedTemplate>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


