import React, { useEffect, useState } from 'react';
import  Home  from './components/Home';
import LoginPage from './components/LoginPage';
import './custom.css'
import {useSelector} from 'react-redux';
import { useCookies } from 'react-cookie';


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

