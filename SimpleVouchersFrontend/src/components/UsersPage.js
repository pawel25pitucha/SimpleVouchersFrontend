import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, FormControl, Row } from 'react-bootstrap'
import NavBar from './NavBar'
import axios from 'axios'
import './Styles/UserPage.css'
const url="https://localhost:5001";

function UsersPage() {
    const [data , setData] = useState([]);
    const [role, setRole] = useState('');
    useEffect(() => {
       loadData();
    }, [])
    useEffect(() => {
        console.log(role);
     }, [role])
    const loadData=()=>{
        axios.get(url+'/api/User')
        .then(res => {
            setData(res.data);
            console.log(res);
        });
    }
    const search =(e)=>{
        if(e.target.value){
            var filtered=[];
            data.map(user => {
                if(user.email&&user.email.toLowerCase().match(e.target.value.toLowerCase()+".*")
                || user.username&&user.username.toLowerCase().match(e.target.value.toLowerCase()+".*")
                || user.role&&user.role.toLowerCase().match(e.target.value.toLowerCase()+".*")){
                    filtered=[...filtered,user];
                }
            })
            setData(filtered);
        }else{
            setData([]);
            loadData();
        }
    }

    const changeRole = (id)=>{
        axios({
            method: 'PUT',
            url: `${url}/api/User`,
            data: {
                id: id ,
                role: role
            }
        }).then(res=>{
            setData([]);
            loadData();
        })
    }
    const deleteUser= (id) => {
        axios({
            method: 'DELETE',
            url: `${url}/api/User/${id}`,
        }).then(res=>{
            setData([]);
            loadData();
        })
    }
    return (
        <div className="UserPage">
            <NavBar />
            <h2>Użytkownicy aplikacji</h2>
            <Form className="search">
                    <FormControl onChange={e => search(e)} type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
            <Container fluid>
                <Row>
                    {data&&data.map(user => {
                        return (
                            <Col id={user.id}>
                                 <div className="user">
                                    <div className="email"><a id="color">Email: </a>{user.email}</div>
                                    <div className="username"><a id="color">Username:</a> {user.username}</div>
                                    <div className="role"><a id="color">Rola:</a>{user.role}</div>
                                    <div className="newRole">
                                    <a id="color">Nowa rola:</a>
                                        <select onChange={e=>setRole(e.target.value)}>
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Employee">Employee</option>
                                        </select>
                                    </div>
                                    <button onClick={()=>changeRole(user.id)}>Zapisz</button>
                                    <button onClick={()=>deleteUser(user.id)}>Usuń</button>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>

        </div>
    )
}

export default UsersPage
