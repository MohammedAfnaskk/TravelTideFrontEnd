import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import 'tailwindcss/tailwind.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import store from './redux/store.jsx'; // Import your Redux store

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  <GoogleOAuthProvider clientId="1005876540183-gsofr5joh9spfg6soqsula05ej2p4gcs.apps.googleusercontent.com">
  <BrowserRouter>
  <ToastContainer />

    <App />
  </BrowserRouter>,
  </GoogleOAuthProvider>,
  </Provider>,


)
