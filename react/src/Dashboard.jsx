import { useEffect, useState } from 'react'
import axiosClient from "./axios-client";
import { Card, CardBody, CardHeader, CardText, CardTitle, Col, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem, Spinner, Alert, } from 'reactstrap';
import './index.css'
import { FaAddressCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Dashboard() {

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [open, setOpen] = useState("1");
  let cont = 1
  useEffect(() => {
    setLoading(true)
    axiosClient.get('/dashboard')
      .then((response) => {
        console.log(response)
        setData(response.data)
        setAppointments(response.data.appointments)
        setLoading(false)
      })
      .catch((er) => {
        console.log(er)
      })
  }, [])

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  return (
    <>
      {loading &&
        <Row>
          <Col style={{textAlign:'center'}}>
            <Spinner color="secondary" type="grow"> Carregando...</Spinner>
            <Spinner color="secondary" type="grow"> Carregando...</Spinner>
            <Spinner color="secondary" type="grow"> Carregando...</Spinner>
            <Spinner color="secondary" type="grow"> Carregando...</Spinner>
            <Spinner color="secondary" type="grow"> Carregando...</Spinner>
            <Spinner color="secondary" type="grow"> Carregando...</Spinner>
          </Col>
        </Row>
      }
      {!loading && (
        <>
          <Row>
            <Col>
              <Card
                className="my-2"
                color="secondary"
                inverse
                style={{
                  width: '18rem',
                  height: '10rem'
                }}
              >
                <CardHeader>
                  <h3>Usuários</h3>
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h1">
                    Total: {data.users}
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card
                className="my-2"
                color="success"
                inverse
                style={{
                  width: '18rem',
                  height: '10rem'
                }}
              >
                <CardHeader>
                  <h3>Clientes</h3>
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h1">
                    Total: {data.clients}
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card
                className="my-2"
                color="dark"
                inverse
                style={{
                  width: '18rem',
                  height: '10rem'
                }}
              >
                <CardHeader>
                  <h3>Real-state</h3>
                </CardHeader>
                <CardBody>
                  <CardTitle tag="h1">
                    Total: {data.states}
                  </CardTitle>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <div style={{margin:'20px 0 10px 0'}} className='dashboard-agendamento'><h2>Agendamentos: <Link to='/schedule'><FaAddressCard></FaAddressCard></Link> </h2></div>
            <Accordion open={open} toggle={toggle}>
              {appointments.map(item => (
              <AccordionItem key={item.id}>
                <AccordionHeader targetId={''+cont}>
                  {item.title } <h4 style={{color:'gray', paddingLeft:'10px'}}>{item.selected_date} </h4>              
                </AccordionHeader>
                <AccordionBody accordionId={''+cont++}>
                  <strong>{item.description}</strong>
                </AccordionBody>
              </AccordionItem>
              ))}
            </Accordion>
          </Row>
          <Row style={{marginTop:'50px', textAlign:'right', width:'100%', height:'100px'}}>
          </Row>
       </>
      )}
    </>
  )
}

export default Dashboard
