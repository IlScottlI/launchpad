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
          <Redirect from="/Workspace/safety.html" to="/Workspace/Safety" noThrow />
          <Redirect from="/Workspace/quality.html" to="/Workspace/Quality" noThrow />
          <Redirect from="/Workspace/production.html" to="/Workspace/Production" noThrow />
          <Redirect from="/Workspace/site.html" to="/Workspace/Site" noThrow />
          <Workspace path="Workspace" />
          <Workspace path="Workspace/:categoryPage" />
          <Workspace path="Workspace/:categoryPage/:subPage" />
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
          <Redirect from="/Workspace/safety.html" to="/Workspace/Safety" noThrow />
          <Redirect from="/Workspace/quality.html" to="/Workspace/Quality" noThrow />
          <Redirect from="/Workspace/production.html" to="/Workspace/Production" noThrow />
          <Workspace path="Workspace" />
          <Workspace path="Workspace/:categoryPage" />
          <Workspace path="Workspace/:categoryPage/:subPage" />
        </Router>
        <Router basepath="/LaunchPad">
          <Redirect from="/*" to="/LaunchPad/SignIn" noThrow />
          <SignIn path="/SignIn" />
        </Router>
      </UnauthenticatedTemplate>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


