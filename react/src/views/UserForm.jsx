import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import {Button, Form, Row, Col, FormGroup, Input} from "reactstrap";
import Badge from 'react-bootstrap/Badge';

export default function UserForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('User was successfully created')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      <Row>
        {user.id && <h2>Atualizar usuário: {user.name}</h2>}
        {!user.id && <h2>Novo Usuário</h2>}
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
                <Input style={{margin:"0 0 10px 0"}} value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} placeholder="Nome"/>

                <Input style={{margin:"0 0 10px 0"}} value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="E-mail"/>

                <Input style={{margin:"0 0 10px 0"}} type="password" onChange={ev => setUser({...user, password: ev.target.value})} placeholder="Senha"/>

                <Input type="password" onChange={ev => setUser({...user, password_confirmation: ev.target.value})} placeholder="Confirmar senha"/>
              </Col>
            </FormGroup>
            <Row style={{padding:" 0 50px 0 50px"}}>
              <Col className="col-btn-success">
                <Button color="success">Salvar</Button>
              </Col>
            </Row>
          </Form>
        )}
      </Row>
    </>
  )
}
