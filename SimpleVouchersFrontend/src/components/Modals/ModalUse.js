import React from 'react';
import { Modal,Button} from 'react-bootstrap';

import "../Styles/Home.css";



function ModalUse(props) {

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
                        Wykorzystaj Voucher
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                      <h3>Czy na pewno chcesz wykorzystać voucher?</h3>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Wykorzystaj</Button>
                    <Button onClick={props.onHide}>Anuluj</Button>
                </Modal.Footer>
            </Modal>
                
        </div>
       
    );
}

export default ModalUse;