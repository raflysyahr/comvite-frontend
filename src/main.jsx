import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import './assets/css/animation.css';
import './assets/css/fonts.css';
import { Provider } from 'react-redux';
import HomePage from './pages/HomePage';
import Routing from './routes/Routing';
import { BrowserRouter } from 'react-router-dom';
import reduxStore from './lib/redux/reduxStore';
import { CookiesProvider } from 'react-cookie';


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={{...reduxStore}}>
        <CookiesProvider defaultSetOptions={{ path: '/' }}>
          <Routing/>
        </CookiesProvider>
    </Provider>
)

