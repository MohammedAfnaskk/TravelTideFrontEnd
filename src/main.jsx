import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx";
import 'tailwindcss/tailwind.css';


import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="1005876540183-gsofr5joh9spfg6soqsula05ej2p4gcs.apps.googleusercontent.com">
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  </GoogleOAuthProvider>,

)
