import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, Form, Row, Col, FormGroup, Input, Label, Spinner} from "reactstrap";
import Badge from 'react-bootstrap/Badge';

export default function ClientForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [client, setClient] = useState({
    id: null,
    name: '',
    email: '',
    cpf: '',
    rg: '',
    contact: '',
    contact_alternative: '',
    street: '',
    number: '',
    neighbor: '',
    city: '',
    cep: '',
  })
  
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/clients/${id}`)
        .then(({data}) => {
          setLoading(false)
          setClient(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    setBtnLoading(true)
    if (client.id) {
      axiosClient.put(`/clients/${client.id}`, client)
        .then((msg) => {
          console.log(msg)
          setBtnLoading(false)
          setNotification('O cliente foi atualizado com sucesso!')
          navigate('/clients')
        })
        .catch(err => {
          console.log(err)
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
            setBtnLoading(false)
          }
        })
    } else {
      axiosClient.post('/clients', client)
        .then(() => {
          setNotification('O cliente foi criado com sucesso!')
          navigate('/clients')
          setBtnLoading(false)
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
            setBtnLoading(false)
          }
        })
    }
  }

  return (
    <>
      <Row>
        {client.id && <h2>Atualizar Cliente: {client.name}</h2>}
        {!client.id && <h2>Novo Cliente</h2>}
      </Row>

      <Row className="card animated fadeInDown">
        {loading && (
          <Col className="text-center">
            Loading...
          </Col>
        )}
        {errors &&
          <Col className="alert-errors">
            {Object.keys(errors).map(key => (
              <p><Badge key={key} bg="danger">{errors[key][0]}</Badge></p>
              
            ))}
          </Col>
        }
        {!loading && (
          <Form onSubmit={onSubmit}>
            <FormGroup className="block-form" row>
              <Col>
              <Label>* Nome:</Label>
                <Input value={client.name} onChange={ev => setClient({...client, name: ev.target.value})} placeholder="ex: João da silva"/>
              </Col>
              <Col>
                <Label>E-mail:</Label>
                <Input  value={client.email} onChange={ev => setClient({...client, email: ev.target.value})} placeholder="ex: email@gmail:"/>
              </Col>
            </FormGroup>
            <FormGroup className="block-form" row>
              <Col>
              <Label>* Cpf:</Label>
                <Input  value={client.cpf} onChange={ev => setClient({...client, cpf: ev.target.value})} placeholder="ex: 00000000000"/>
              </Col>
              <Col>
                <Label>* RG:</Label>
                <Input  value={client.rg} onChange={ev => setClient({...client, rg: ev.target.value})} placeholder="ex: mg00000000"/>
              </Col>
            </FormGroup>
            <FormGroup className="block-form" row>
              <Col>
                <Label>* Celular:</Label>
                <Input  value={client.contact} onChange={ev => setClient({...client, contact: ev.target.value})} placeholder="ex: 35999999999"/>
              </Col>
              <Col>
                <Label>Contato Alternativo:</Label>
                <Input  value={client.contact_alternative} onChange={ev => setClient({...client, contact_alternative: ev.target.value})} placeholder="Contato Alternativo"/>
              </Col>
            </FormGroup>
            <FormGroup className="block-form" row>
              <Col>
                <Label>* Rua:</Label>
                <Input  value={client.street} onChange={ev => setClient({...client, street: ev.target.value})} placeholder="ex: rua 1"/>
              </Col>
              <Col>
                <Label>* Numero:</Label>
                <Input type="number"  value={client.number} onChange={ev => setClient({...client, number: ev.target.value})}/>
              </Col>
            </FormGroup>
            <FormGroup className="block-form" row>
              <Col>
                <Label>* Bairro:</Label>
                <Input  value={client.neighbor} onChange={ev => setClient({...client, neighbor: ev.target.value})} placeholder="ex: centro"/>
              </Col>
              <Col>
                <Label>* Cidade:</Label>
                <Input  value={client.city} onChange={ev => setClient({...client, city: ev.target.value})} placeholder="ex: Andradas"/>
              </Col>
            </FormGroup>
            <FormGroup className="block-form" row>
              <Col xs='4'>
                <Label>* CEP:</Label>
                <Input  value={client.cep} onChange={ev => setClient({...client, cep: ev.target.value})} placeholder="ex: 00000000"/>
              </Col>
            </FormGroup>
            <Row style={{padding:" 0 50px 0 50px"}}>
              <Col className="col-btn-success">
                {!btnLoading &&
                  <Button color="success">Salvar</Button>
                }
                {btnLoading &&
                  <Button disabled color="success">
                    <Spinner size="sm">
                      Salvando...
                    </Spinner>
                  </Button>
                }
              </Col>
            </Row>
          </Form>
        )}
      </Row>
    </>
  )
}
