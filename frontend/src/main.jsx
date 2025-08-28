<<<<<<< HEAD
=======
<<<<<<< HEAD
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// Removed global axios defaults to use custom axios instance in src/api/axios.js
=======
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
<<<<<<< HEAD
// Removed global axios defaults to use custom axios instance in src/api/axios.js
=======
import axios from "axios";

axios.defaults.baseURL="http://localhost:5000";
axios.defaults.withCredentials=false;
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
<<<<<<< HEAD
)
=======
<<<<<<< HEAD
);
=======
)
>>>>>>> d3d77a7581ca8f69f49219777c1d6dc1b188395e
>>>>>>> 3f014bd22e10e37ea0a98bd114216001af0af8e7
