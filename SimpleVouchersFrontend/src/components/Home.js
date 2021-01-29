import React, { Component } from 'react';
import NavBar from "./NavBar";
import MainTable from './MainTable';
import "./Styles/Home.css";
import axios from 'axios';


function Home(props) {

    return (
        <div>
            <NavBar user={props.user} />
            <div className="mainTable-container">
                <MainTable user={props.user}/>
             </div>
        </div>
    );
}

export default Home;


