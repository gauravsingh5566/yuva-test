import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'swiper/css';
import './css/animate.min.css';
import '@radix-ui/themes/styles.css';
import './css/style.css';
import App from './App';
import {UserProvider} from 'global/context';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <React.StrictMode>
    <BrowserRouter>
      <App />

    </BrowserRouter>

    </React.StrictMode>
  </UserProvider>
);
