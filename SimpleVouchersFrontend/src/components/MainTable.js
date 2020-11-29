import React, { useState } from 'react';
import {Table, Button, Form, FormControl} from 'react-bootstrap';
import "./Styles/MainTable.css";
import { Container, Row,Col } from 'reactstrap';
import { useEffect } from 'react';
import ModalUse from "./Modals/ModalUse";
import ModalInfo from "./Modals/ModalInfo";
import ModalEdit from "./Modals/ModalEdit";


function MainTable({ vouchers }) {
    const [modalUseShow, setModalUseShow] = React.useState(false);
    const [modalInfoShow, setModalInfoShow] = React.useState(false);
    const [modalEditShow, setModalEditShow] = React.useState(false);
    const [data, setData] = useState([]);


    const checkDate = (date) => {
        var today = new Date();
        var voucherDate = new Date(date);
     
        if (today <= voucherDate) return true;
        else return false;
    }


    useEffect(() => {
        setData(
            [
                { name: "Paweł", lastname: "Pitucha", date: "09-10-2019", price: "1000zł", code: "slahjfdlsaj" },
                { name: "Kamil", lastname: "Patecki", date: "11-11-2019", price: "1005zł", code: "slasjfdlsaj" },
                { name: "Kamil", lastname: "Olszewski", date: "10-22-2019", price: "1050zł", code: "fgdhdfglsaj" },
                { name: "Paweł", lastname: "Pitucha", date: "09-10-2019", price: "1000zł", code: "slahjfdlsaj" },
                { name: "Paweł", lastname: "Pitucha", date: "09-10-2019", price: "1000zł", code: "slahjfdlsaj" },
                { name: "Kamil", lastname: "Patecki", date: "11-11-2019", price: "1005zł", code: "slasjfdlsaj" },
                { name: "Kamil", lastname: "Olszewski", date: "10-22-2019", price: "1050zł", code: "fgdhdfglsaj" },
                { name: "Paweł", lastname: "Pitucha", date: "09-10-2019", price: "1000zł", code: "slahjfdlsaj" },
                { name: "Paweł", lastname: "Pitucha", date: "09-10-2019", price: "1000zł", code: "slahjfdlsaj" },
                { name: "Kamil", lastname: "Patecki", date: "11-11-2019", price: "1005zł", code: "slasjfdlsaj" },
                { name: "Kamil", lastname: "Olszewski", date: "10-22-2019", price: "1050zł", code: "fgdhdfglsaj" }, 
                { name: "Paweł", lastname: "Pitucha", date: "09-10-2019", price: "1000zł", code: "slahjfdlsaj" },
            ]
        );
    }, []);
     
    return (
        <div className="Table">
            
            <Container fluid className="Container" >
                <Row>
                    <Col>
                        <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Col>
                    <Col className="col-btn">
                        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="./Modal">Stwórz</button>
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
                                    data.map((voucher, i) => (
                                        <tr key={voucher.code} >
                                        <td className="td-lp">{i+1}</td>
                                        <td><a>{voucher.name}</a></td>
                                        <td><a>{voucher.lastname}</a></td>
                                        <td className={(checkDate(voucher.date) ? 'correctDate' : 'uncorrectDate')}><a>{voucher.date}</a></td>
                                        <td><a>{voucher.price}</a></td>
                                        <td><a>{voucher.code}</a></td>
                                        <td className="td-actions-buttons">
                                                <Button variant="success" onClick={() => setModalUseShow(true)} >Wykorzystaj</Button>
                                            {' '}
                                                <Button variant="info" onClick={() => setModalEditShow(true)} >Edytuj</Button>
                                            {' '}
                                                <Button variant="secondary" onClick={() => setModalInfoShow(true)}>Szczegóły</Button>
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
                    onHide={() => setModalUseShow(false)}
                />
                <ModalInfo
                    show={modalInfoShow}
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