import { Modal } from 'react-bootstrap';

function MessageModal(props) {

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton onClick={props.handleClose}></Modal.Header>
            <Modal.Body className={props.message.type} onClose={() => props.setMessage('')}>
                {props.message.msg}
            </Modal.Body>
        </Modal>
    );
}

export default MessageModal;