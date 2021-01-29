import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Raport from './components/Raport';
import Stats from './components/Stats';
import {createStore} from 'redux';
import loggedReducer from './reducers/isLogged';
import {Provider} from 'react-redux';
import CreateVoucher from './components/CreateVoucher';
import Register from './components/Register';
import LoginPage from './components/LoginPage';
import { CookiesProvider } from 'react-cookie';
import UsersPage from './components/UsersPage';


const store= createStore(loggedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <BrowserRouter basename={baseUrl}>
                <Route exact path="/" component={App} />
                <Route path="/raport" component={Raport} />
                <Route path="/statystyki" component={Stats} />
                <Route path="/create" component={CreateVoucher} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={Register} />
                <Route path="/users" component={UsersPage} />
            </BrowserRouter>
        </Provider>
    </CookiesProvider>,
  rootElement);


