import React, { useEffect, useState } from 'react';
import  Home  from './components/Home';
import LoginPage from './components/LoginPage';
import './custom.css'
import {useSelector} from 'react-redux';
import axios from 'axios'
axios.defaults.withCredentials=true;


export default function App() {
  const isLogged = useSelector(state=> state);

  return (
    <div>
      {
       (isLogged) ? <Home /> :  <LoginPage/>
      }
    </div>
     
  )
}

