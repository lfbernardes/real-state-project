import React, { useState, useEffect } from 'react';
import axiosClient from "../../axios-client";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useStateContext } from '../../context/ContextProvider';
import { Spinner } from 'reactstrap';

const ModalLink = (props) => {

  const { show, handleClose, values } = props;
  const [loadingModal, setLoadingModal] = useState(false)
  const {setNotification} = useStateContext()

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    selected_date: '',
    selected_time: '',
    description: '',
  });
  useEffect(() => {
    if (show) {
      // Do something to force update myState
      setFormData(values);
    }
  },[show]);
  
  function handleSchedule(ev){
    ev.preventDefault()
    if (values.id) {
      setLoadingModal(true)
      const data = {
        id: formData.id,
        title: formData.title,
        selected_date: formData.selected_date,
        selected_time: formData.selected_time,
        description: formData.description 
      }
      axiosClient.put(`/schedules/${data.id}`, data)
        .then(() => {
          setNotification('O Imóvel foi atualizado com sucesso!')
          // navigate('/schedule')
          setLoadingModal(false)
          handleClose()
        })
        .catch(err => {
          console.log("on submit - error3")
          console.log(err)
          const response = err.response;
          if (response && response.status === 422) {
            // setErrors(response.data.errors)
          }
        })
    } else {      
      setLoadingModal(true)
      const data = {
        title: formData.title,
        selected_date: formData.selected_date,
        selected_time: formData.selected_time,
        description: formData.description 
      }
      axiosClient.post('/schedules', data)
      .then((response) => {
        setLoadingModal(false)
        handleClose()
        setNotification('O imóvel foi criado com sucesso!')
        // navigate('/schedule')
        })
        .catch(err => {
          console.log(err)
          console.log(err.response)
          const response = err.response;
          if (response && response.status === 422) {
            // setErrors(response.data.errors)
          }
        })
    }
  }

    return (
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          {values.id &&
            <Modal.Title>Editar Compromisso</Modal.Title>
          }
          {values.title == '' &&
            <Modal.Title>Agendar Compromisso</Modal.Title>
          }
          
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <input type="text" value={formData.title == ''? '':formData.title} onChange={ev => setFormData({...formData, title: ev.target.value})} placeholder="Dê um título para este agendamento."></input>
              <div></div>
            </div>
            <div>
              <h5 style={{marginTop:'10px'}}>Informações do agendamento</h5>
              <div className="modal-link-date">
                <div style={{marginRight: '10px'}}>
                  <p>Data:</p>
                  <input type="date" value={formData.selected_date ==''? '':formData.selected_date} onChange={ev => setFormData({...formData, selected_date: ev.target.value})}></input>

                </div>
                <div>
                  <p>Horário:</p>
                  <input type="time" value={formData.selected_time ==''? '':formData.selected_time} onChange={ev => setFormData({...formData, selected_time: ev.target.value})}></input>
                </div>
              </div>
              <div>
                <textarea rows="4" cols="50" value={formData.description ==''? '':formData.description} onChange={ev => setFormData({...formData, description: ev.target.value})} placeholder="Descreva seu compromisso."></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {!loadingModal &&
            <div>
              <Button style={{marginRight:'10px'}} variant="secondary" onClick={ev => handleClose(ev)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={ev => handleSchedule(ev)}>Salvar</Button>
            </div>
          }

          {loadingModal &&
            <Button variant="primary" onClick={ev => handleSchedule(ev)}>
              <Spinner size="sm">
                Salvando...
              </Spinner>
            </Button>
          }
        </Modal.Footer>
      </Modal>
    );
}

export default ModalLink;