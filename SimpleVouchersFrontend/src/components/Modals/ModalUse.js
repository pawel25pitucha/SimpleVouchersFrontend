import React from 'react';
import { Modal,Button} from 'react-bootstrap';
import axios from 'axios';
import "../Styles/Home.css";
const url="https://localhost:5001";


function ModalUse(props) {

    const useVoucher=()=>{
        axios({
            method: 'DELETE',
            url: `${url}/api/Vouchers/${props.voucher.id}`,
        }).then(res => {
            console.log(res);
            props.onHide();
        })
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
                        Wykorzystaj Voucher
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                      <h3>Czy na pewno chcesz wykorzystać voucher?</h3>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={useVoucher}>Wykorzystaj</Button>
                    <Button onClick={props.onHide}>Anuluj</Button>
                </Modal.Footer>
            </Modal>
                
        </div>
       
    );
}

export default ModalUse;