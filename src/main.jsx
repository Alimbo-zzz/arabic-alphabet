import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss';
import App from './App';
import {HashRouter} from 'react-router-dom';
import store from '@/store';
import { Provider } from 'react-redux';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <HashRouter> 
      <App /> 
    </HashRouter>
  </Provider>
)
