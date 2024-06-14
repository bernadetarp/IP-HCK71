// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';

// import.meta.env.VITE_CLIENTID
// import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  // <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
    <App />
  // </GoogleOAuthProvider>
  // </React.StrictMode>,
)
