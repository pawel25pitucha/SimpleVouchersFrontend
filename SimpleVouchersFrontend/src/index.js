import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Raport from './components/Raport';
import Stats from './components/Stats';


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        <Route exact path="/" component={App} />
        <Route path="/raport" component={Raport} />
        <Route path="/statystyki" component={Stats} />

  </BrowserRouter>,
  rootElement);


