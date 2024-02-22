import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalDelete = ({show, handleClose, user}) => {
    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header>
          <Modal.Title>Excuir usuário</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          Tem certeza que deseja excluir?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ev => handleClose({id:''})}>
            Sair
          </Button>
          <Button  onClick={ev => handleClose(user)} variant="danger">Continuar</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ModalDelete;