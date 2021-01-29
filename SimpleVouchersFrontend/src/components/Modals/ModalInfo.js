import React, { useEffect, useState } from 'react';
import { Modal,Button} from 'react-bootstrap';
import './ModalInfo.css';
import "../Styles/Home.css";



function ModalInfo(props) {


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
                       Szczegóły Vouchera
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="info-div">
                        <h2>Imię:</h2><h2 id="value">{props.voucher&&props.voucher.client.firstname}</h2>
                        <h2>Nazwisko:</h2><h2 id="value">{props.voucher&&props.voucher.client.surname}</h2>
                        <h2>Kwota:</h2><h2 id="value">{props.voucher&&props.voucher.amount}zł</h2>
                        <h2>Data ważności:</h2><h2 id="value">{props.voucher&&props.voucher.endDate}</h2>
                        <h2>Kod:</h2><h1 id="code">{props.voucher&&props.voucher.code}</h1>  
                    </div>                     
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Zamknij</Button>
                </Modal.Footer>
            </Modal>
                
        </div>
       
    );
}

export default ModalInfo;