import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import './Styles/CreateVoucher.css'
import { FormControl, InputGroup, Spinner } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
const url="https://localhost:5001";

function CreateVoucher() {

    const [client, setClient] = useState(null);
    const [newClientName, setnewClientName] = useState('');
    const [newClientSurname, setnewClientSurname] = useState('');
    const [code, setCode] = useState('VOUCHER CODE');
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const [clients,setClients] =useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData=()=>{
        axios.get(url+'/api/Customers')
        .then(res =>{
            console.log(res.data);
            res.data.map(data => {
                let newClient = {id: data.id, firstname: data.firstname, surname: data.surname, phoneNumber:data.phoneNumber}
                setClients(clients =>[...clients,newClient]);
            })
        });
    }

    const parseDate=(date)=>{
        var day = date.getDate();    
        if(day<10) day='0'+day;   // yields date
        var month = date.getMonth() + 1;  
        if(month<10) month = '0'+month;  // yields month (add one as '.getMonth()' is zero indexed)
        var year = date.getFullYear();  // yields year
        var hour = date.getHours();     // yields hours 
        var minute = date.getMinutes(); // yields minutes
        var second = date.getSeconds(); // yields seconds

        // After this construct a string with the above results as below
        var time = year + "-" + month + "-" + day; 
        return time;
    }

    const saveVoucher=()=>{
        setLoading(true);
        if(client){
            console.log(parseDate(date));
            console.log(price);
            console.log(client.id)
           axios({
                method: 'POST',
                url: `${url}/api/Vouchers`,
                data: {
                    amount: JSON.parse(price),
                    expirationDate: parseDate(date),
                    customerId:client.id
                }
            }).then(res => {
                setLoading(false);
                setCode(res.data.code)
            })
        }
        else{
            axios({
                method: 'POST',
                url: `${url}/api/Customers`,
                data: {
                    firstname:newClientName,
                    surname: newClientSurname
                 }
            }).then(res => {
                axios({
                    method: 'POST',
                    url: `${url}/api/Vouchers`,
                    data: {
                        amount: JSON.parse(price),
                        expirationDate: parseDate(date),
                        customerId:res.data.id
                    }
                }).then(res => {
                    setLoading(false);
                    setCode(res.data.code)
                })
            })
            
        }
            
            
        
    }
    const handleChange=(e,value)=>{
        setClient(value);
    }
    const handleNameChange= (e) => {
        setnewClientName(e.target.value);
    }
    const handleSurnameChange= (e) => {
        setnewClientSurname(e.target.value);
    }

    return (
        <div className="CreateVoucher">
            <NavBar />
            <div className="shadow">
                <div className="Voucher">
                    <h1>Voucher</h1>
                    <div className="Inputs">
                     
                     <div className="Autocomplete">
                        <Autocomplete
                            id="autoComplete"
                            options={clients}
                            getOptionLabel={(option) => option.surname}
                            style={{ width: 300 }}
                            onChange={handleChange}
                            renderInput={(params) => (
                            <TextField {...params}  label="Wyszukaj klienta" variant="outlined"/> 
                            )}   
                        />
                     </div>
                        <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Imię i nazwisko</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Imię" onChange={e => handleNameChange(e)} value={client? client.firstname : newClientName}/>
                        <FormControl placeholder="Nazwisko" onChange={e => handleSurnameChange(e)} value={client? client.surname : newClientSurname} />
                        </InputGroup>
                    </div>
                    <a>Data ważności vouchera:</a>
                    <div style={{display:'grid'}}>
                        <DatePicker selected={date} onChange={date => setDate(date)} />
                        <a>Kwota:</a>
                        <input className="priceInput" type="number"  onInput={ e => setPrice(e.target.value)} value={price} />
                    </div>
                    <div style={{display:'grid'}}>
                    <span  className={(code!=='VOUCHER CODE')? "CodeGreen" : "Code"}>{code}</span>
                    {loading ?
                        <Spinner className="spinner" animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        : ''
                    }
                    </div>
                    <div className="VoucherCode">
                        <button onClick={saveVoucher}>Stwórz Voucher</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateVoucher
