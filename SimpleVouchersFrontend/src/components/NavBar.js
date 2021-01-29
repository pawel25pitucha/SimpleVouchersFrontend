import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import "./Styles/NavBar.css";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import logIN from '../actions/login';
import axios from 'axios';
const url="https://localhost:5001";
axios.defaults.withCredentials=true;

function NavBar() {
    const dispatch = useDispatch();

    const logout=()=>{

        dispatch(logIN());
        axios({
            method: 'POST',
            url: `${url}/api/Auth/logout`
        }).then(res=> window.location.reload());

    }    
    return (
        <Navbar className="NavBar" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand><Link to="/" className="navbar-link-brand">VoucherApp</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/" className="navbar-link">Voucher</Link></Nav.Link>
                    <Nav.Link><Link to="/statystyki" className="navbar-link">Statystyki</Link></Nav.Link>
                    {window.Role === 'Admin' ?  <Nav.Link><Link to="/users" className="navbar-link">Użytkownicy</Link></Nav.Link> : '' } 
                </Nav>
                <Nav>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default NavBar;