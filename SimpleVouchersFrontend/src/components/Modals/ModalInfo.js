import React, { useEffect, useState } from 'react';
import { Modal,Button} from 'react-bootstrap';

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
                    <h2>Imię:{props.voucher&&props.voucher.client.firstname}</h2>
                    <h2>Nazwisko:{props.voucher&&props.voucher.client.surname}</h2>
                    <h2>Kwota:{props.voucher&&props.voucher.amount}zł</h2>
                    <h2>Data ważności:{props.voucher&&props.voucher.endDate}</h2>
                    <h1>Kod:{props.voucher&&props.voucher.code}</h1>                      
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Zamknij</Button>
                </Modal.Footer>
            </Modal>
                
        </div>
       
    );
}

export default ModalInfo;