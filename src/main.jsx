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
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './redux/store.jsx';

 ReactDOM.createRoot(document.getElementById("root")).render(
 
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

  <GoogleOAuthProvider clientId="1005876540183-gsofr5joh9spfg6soqsula05ej2p4gcs.apps.googleusercontent.com">
 
  <BrowserRouter>
  <ToastContainer/>

    <App />
  </BrowserRouter>
  </GoogleOAuthProvider>
  </PersistGate>

  </Provider>


)
