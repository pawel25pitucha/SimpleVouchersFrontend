import React, { useState } from 'react';
import {Table, Button, Form, FormControl} from 'react-bootstrap';
import "./Styles/MainTable.css";
import { Container, Row,Col } from 'reactstrap';
import { useEffect } from 'react';
import ModalUse from "./Modals/ModalUse";
import ModalInfo from "./Modals/ModalInfo";
import ModalEdit from "./Modals/ModalEdit";
import { Link } from 'react-router-dom';
import axios from 'axios';
const url="https://localhost:5001";

function MainTable() {
    const [modalUseShow, setModalUseShow] = React.useState(false);
    const [modalInfoShow, setModalInfoShow] = React.useState(false);
    const [modalEditShow, setModalEditShow] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState(false);
    const [data, setData] = useState([]);
    const [clickedVoucher,setClickedVoucher]= React.useState(null);
    const [modalType,setModalType] = React.useState('');


    const checkDate = (date) => {
        var today = new Date();
        var voucherDate = new Date(date);

        if (today <= voucherDate) return true;
        else return false;
    }
   
    const search =()=>{
   
    }
    const deletedVoucher=()=>{
        setData([]);
        setModalUseShow(false);
        loadData();
    }
    useEffect(() => {
        loadData();
    }, []);

    const loadData=()=>{
        axios.get(url+'/api/Vouchers')
        .then(res => {
            res.data.map(x=> {
                var voucher ={amount: x.amount, code:x.code, client:x.customer, endDate: x.expirationDate, id:x.id};
                setData(data => [...data,voucher]);
            })
        });
    }

    const activateInfo=(voucher)=>{
        setModalType('info');
        setClickedVoucher(voucher);  
    }
    const activateUse=(voucher)=>{
        setModalType('use');
        setClickedVoucher(voucher);  
    }
    useEffect(() => {
        if(modalType==='info') setModalInfoShow(true);
        if(modalType==='use') setModalUseShow(true);
    }, [clickedVoucher]);
    return (
        <div className="Table">
            
            <Container fluid className="Container" >
                <Row>
                    <Col>
                        <Form inline>
                        <FormControl onChange={e => setSearchValue(e.target.value)} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button onClick={search} variant="outline-success">Search</Button>
                        </Form>
                    </Col>
                    <Col className="col-btn">
                    <Link to="/create" id="linkToCreate"> <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="./Modal"> Stwórz</button></Link> 
                    </Col>
                </Row>
                <Row>
                    <div class="table-wrapper-scroll-y my-custom-scrollbar">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Imię</th>
                                <th>Nazwisko</th>
                                <th>Data-ważności</th>
                                <th>Kwota</th>
                                <th>Kod</th>
                                <th>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    data&&data.map((voucher, i) => (
                                        <tr key={voucher.id} >
                                        <td className="td-lp">{i+1}</td>
                                        <td><a>{voucher.client.firstname}</a></td>
                                        <td><a>{voucher.client.surname}</a></td>
                                        <td className={(checkDate(voucher.endDate) ? 'correctDate' : 'uncorrectDate')}><a>{voucher.endDate}</a></td>
                                        <td><a>{voucher.amount}zł</a></td>
                                        <td><a>{voucher.code}</a></td>
                                        <td className="td-actions-buttons">
                                                <Button variant="success" onClick={() => activateUse(voucher)} >Wykorzystaj</Button>
                                            {' '}
                                                <Button variant="info" onClick={() => setModalEditShow(true)} >Edytuj</Button>
                                            {' '}
                                                <Button variant="secondary" onClick={()=>activateInfo(voucher)}>Szczegóły</Button>
                                            {' '}
                                        </td>
                                    </tr>
                                ))
                            }               
                        </tbody>
                        </Table>
                       </div>
                </Row>
            </Container>
            <>
                <ModalUse
                    show={modalUseShow}
                    voucher={clickedVoucher}
                    onHide={deletedVoucher}
                />
                <ModalInfo
                    show={modalInfoShow}
                    voucher={clickedVoucher}
                    onHide={() => setModalInfoShow(false)}
                />
                <ModalEdit
                    show={modalEditShow}
                    onHide={() => setModalEditShow(false)}
                />
            </>
        </div> 
    );
}


export default MainTable;