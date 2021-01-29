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
import PasswordStrengthBar from 'react-password-strength-bar';
import { useDispatch } from 'react-redux';
import axios from 'axios'
const url="https://localhost:5001";

function Register(){
    const dispatch = useDispatch();
    const[visibility,setVisbility]= useState(false);
    const[isLogged, setIsLogged]=useState(false);
    const[loginName, setLoginName]= useState('');
    const[password, setPassword]= useState('');
    const[error,setError]= useState('');
    const [email, setEmail] = useState('')

    const handleChangeLogin= (event) =>{
        setLoginName(event.target.value);
    }
    const handleChangePassword= (event) =>{
        setPassword(event.target.value);
    }

    const register =() => {
        axios({
            method: 'POST',
            url: `${url}/api/Auth/register`,
            data: {
                username:loginName,
                email: email,
                password: password
            }
        }).then(res=>{
            console.log(res);
            if(res.data.errors[0]){
                setError(res.data.errors[0].description);
            }
            else setError('Sukces! Wróć do logowania!');
            //window.location="/login";
        }).catch(error => {
            console.log(error);
            setError('Incorrect')
        })
    }
 
  
    return (
        <div className="LoginPage">
            <div className="Login-box">
                <h2>Register</h2>
                <div className="Login-box-element">
                    <AccountCircle />
                    <TextField id="input-with-icon-grid" label="Email" type='email' value={email} onChange={e => setEmail(e.target.value) } />
                </div>
              
                <div className="Login-box-element">
                    <AccountCircle />
                    <TextField id="input-with-icon-grid" label="Login"  onChange={event=>handleChangeLogin(event)} />
                </div>
              
                <div className="Login-box-element">
                    <VisibilityOffIcon className="visibilityButton" onClick={() => setVisbility(!visibility)}/>
                    <TextField id="input-with-icon-grid" label="Password" type={visibility? 'text' : 'password'} value={password} onChange={event=>handleChangePassword(event)} />
                    <PasswordStrengthBar password={password} />
                </div>
                <Button id="LoginButton" variant="contained" color="primary" onClick={register}>Register</Button>
                {
                    error? <a>{error}</a> : ' '
                }
                 <Link to="/login"> <Button variant="primary">Wróć do logowania</Button></Link>  
            </div>      
        </div>
    )
}

export default Register
