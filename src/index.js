import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { AppState } from './Redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-p7vx5zxzsmz52nqh.us.auth0.com"
      clientId="VFwlL64g216gZmlQrvCN4KMf1tZPs30M"
      authorizationParams={{
        audience: "testingapi.nubby",
        redirect_uri: window.location.origin
      }}
      cacheLocation='memory'
    >
      <Provider store={AppState}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
