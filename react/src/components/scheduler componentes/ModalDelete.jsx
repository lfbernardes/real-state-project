import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const ModalDelete = ({showModalDelete, closeModalDelete, appointment}) => {
    return (
      <Modal
        show={showModalDelete}
        onHide={closeModalDelete}
        backdrop="static"
        keyboard={false}
      >
        {/* <Modal.Header>
          <Modal.Title>Excuir usuário</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          Tem certeza que deseja excluir esse usuário?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ev => closeModalDelete({id:''})}>
            Sair
          </Button>
          <Button  onClick={ev => closeModalDelete({id:appointment})} variant="danger">Continuar</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default ModalDelete;