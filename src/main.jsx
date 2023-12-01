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

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById("root")).render(
=======
ReactDOM.createRoot(document.getElementById('root')).render(
>>>>>>> origin/main
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

  <GoogleOAuthProvider clientId="1005876540183-gsofr5joh9spfg6soqsula05ej2p4gcs.apps.googleusercontent.com">
<<<<<<< HEAD
  {/* <BrowserRouter> */}
  <React.StrictMode>

  <ToastContainer />
    <App />
  </React.StrictMode>

  {/* </BrowserRouter> */}
  </GoogleOAuthProvider>
=======
  <BrowserRouter>
  <ToastContainer />

    <App />
  </BrowserRouter>,
  </GoogleOAuthProvider>,
>>>>>>> origin/main
  </PersistGate>

  </Provider>,


)
