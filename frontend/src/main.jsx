<<<<<<< HEAD
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// Removed global axios defaults to use custom axios instance in src/api/axios.js
=======
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios";

axios.defaults.baseURL="http://localhost:5000";
axios.defaults.withCredentials=false;
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
<<<<<<< HEAD
);
=======
)
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
