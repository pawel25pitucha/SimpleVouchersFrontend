import React from 'react';
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
                    
                      <h3>Tutaj wyświetlane bedą szczegóły vouchera.</h3>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Zamknij</Button>
                </Modal.Footer>
            </Modal>
                
        </div>
       
    );
}

export default ModalInfo;