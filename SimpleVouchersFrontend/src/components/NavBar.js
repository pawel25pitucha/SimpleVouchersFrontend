import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import "./Styles/NavBar.css";
import { Link } from "react-router-dom";


function NavBar() {
    return (
        <Navbar className="NavBar" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand><Link to="/" className="navbar-link-brand">VoucherApp</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link><Link to="/" className="navbar-link">Voucher</Link></Nav.Link>
                    <Nav.Link><Link to="/raport" className="navbar-link">Raport</Link></Nav.Link>
                    <Nav.Link><Link to="/statystyki" className="navbar-link">Statystyki</Link></Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}


export default NavBar;