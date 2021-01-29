import React, { useEffect, useState } from 'react'
import './Styles/LoginPage.css';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import logIN from '../actions/login';
import { useDispatch } from 'react-redux';

import axios from 'axios'
axios.defaults.withCredentials=true;
const url="https://localhost:5001";

function LoginPage(props){
    const dispatch = useDispatch();
    const[visibility,setVisbility]= useState(false);
    const[isLogged, setIsLogged]=useState(false);
    const[loginName, setLoginName]= useState('');
    const[password, setPassword]= useState('');
    const[error,setError]= useState('');

    const handleChangeLogin= (event) =>{
        setLoginName(event.target.value);
    }
    const handleChangePassword= (event) =>{
        setPassword(event.target.value);
    }

    const login =() => {
        axios({
            method: 'POST',
            url: `${url}/api/Auth/login`,
            data: {
                email: loginName,
                password: password
            }
        }).then(res=>{
            props.userUpdate(res.data.loginAccount);
            setIsLogged(true);
            setTimeout(function(){dispatch(logIN())},1000);
        }).catch(error => {
            console.log(error);
            setError('Incorrect')
        })



    
    }
 
  
    return (
        <div className="LoginPage">
            <div className="Login-box">
                <h2>Login</h2>
                {
                    (isLogged)? <LockOpenIcon className="LockedIcon" style={{ fontSize: 50 }} /> : <LockIcon className="LockedIcon" style={{ fontSize: 50 }} />
                }
                <div className="Login-box-element">
                    <AccountCircle />
                    <TextField id="input-with-icon-grid" label="Login"  onChange={event=>handleChangeLogin(event)} />
                </div>
              
                <div className="Login-box-element">
                    <VisibilityOffIcon className="visibilityButton" onClick={() => setVisbility(!visibility)}/>
                    <TextField id="input-with-icon-grid" label="Password" type={visibility? 'text' : 'password'} value={password} onChange={event=>handleChangePassword(event)} />
                    
                </div>
                <Button id="LoginButton" variant="contained" color="primary" onClick={login}>Login</Button>
                <a><Link to="/register">Nie masz konta? Zarejestruj się!</Link></a>
                {
                    error? <a>{error}</a> : ' '
                }
            </div>      
        </div>
    )
}

export default LoginPage
