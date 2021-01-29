import React, { Component } from 'react';
import NavBar from "./NavBar";
import MainTable from './MainTable';
import "./Styles/Home.css";
import axios from 'axios';


function Home() {

    return (
        <div>
            <NavBar/>
            <div className="mainTable-container">
                <MainTable />
             </div>
        </div>
    );
}

export default Home;


