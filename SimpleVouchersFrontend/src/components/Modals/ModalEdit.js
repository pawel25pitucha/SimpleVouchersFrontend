import React, { useState, useEffect } from 'react';
import { Modal,Button, InputGroup, FormControl} from 'react-bootstrap';
import CreateVoucher from '../CreateVoucher';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';
import './ModalEdit.css';

const url="https://localhost:5001";
function ModalUse(props) {
  
    const [clients, setClients] = useState([]);
    const [client, setClient] = useState(null);
    const [newClientName, setnewClientName] = useState('');
    const [newClientSurname, setnewClientSurname] = useState('');
    const [date, setDate] = useState(new Date());
    const [price, setPrice] = useState(0);
    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if(props.voucher !== null){
            setClient(props.voucher.client);
        } 
    }, [props.voucher]);

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

    const handleChange=(e,value)=>{
        setClient(value);
        setnewClientName('');
        setnewClientSurname(''); 
    }
    const handleNameChange= (e) => {
        setnewClientName(e.target.value);
    }
    const handleSurnameChange= (e) => {
        setnewClientSurname(e.target.value);
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
        if(client){
           axios({
                method: 'PUT',
                url: `${url}/api/Vouchers/${props.voucher.id}`,
                data: {
                    amount: JSON.parse(price),
                    expirationDate: parseDate(date),
                    customerId:client.id
                }
            }).then(res => {
                props.onHide();
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
                    method: 'PUT',
                    url: `${url}/api/Vouchers/${props.voucher.id}`,
                    data: {
                        amount: JSON.parse(price),
                        expirationDate: parseDate(date),
                        customerId:res.data.id
                    }
                }).then(res => {
                    props.onHide();
                })
            })
            
        }    
     
    }

    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edytuj Voucher
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                     <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Imię i nazwisko</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Imię" onChange={e => handleNameChange(e)} value={client? client.firstname : newClientName}/>
                        <FormControl placeholder="Nazwisko" onChange={e => handleSurnameChange(e)} value={client? client.surname : newClientSurname} />
                        </InputGroup>
                                <div className="Edit">
                                    <a>Data ważności vouchera</a>
                                    <a id="color-a" >{props.voucher&&props.voucher.endDate}</a>
                                    <div className="Edit2" style={{display:'grid'}}>
                                        <a>Nowa data</a>
                                        <DatePicker selected={date} onChange={date => setDate(date)} />
                                        <a>Obecna kwota</a>
                                        <a id="color-a">{props.voucher&& props.voucher.amount}zł</a>
                                        <a>Kwota:</a>
                                        <input className="priceInput" type="number"  onInput={ e => setPrice(e.target.value)} value={price} />
                                    </div>
                                    <h2 id="code">{props.voucher&&props.voucher.code}</h2>
                                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={saveVoucher}>Edytuj</Button>
                </Modal.Footer>
            </Modal>
                
        </div>
       
    );
}

export default ModalUse;