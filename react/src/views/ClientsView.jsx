import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Button, Col, ListGroup, ListGroupItem, Row, Spinner, Table} from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaLink, FaPen, FaTrash } from "react-icons/fa";
import ModalDelete from "./ModalDelete";
import Badge from 'react-bootstrap/Badge';


export default function ClientsView(args) {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [clientDelete, setClientDelete] = useState({});
    const navigate = useNavigate();
  
    //pagination
    const [data, setData] = useState([]);
    const [owner, setOwner] = useState({});
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [items, setItems] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    let {id} = useParams();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const response = await axiosClient.get(`/clients/${id}`);
            setLoading(false)
            setOwner(response.data.states)
            setData(response.data)
        }
        fetchData();
    }, [items]);      
    
      const handleClick = (image) => {
        setSelectedImage(image);
      };

      // modal delete
      const handleShow = () => setShow(true);
      const handleClose = (client) => {
        if(client.id == ''){
          setShow(false);
        }else{
          axiosClient.delete(`/clients/${client.id}`)
          .then((response) => {
            setShow(false);
            navigate('/clients')
          })
        }
        
      }
      const onDeleteClick = client => {
        setClientDelete(client)
        handleShow()
      }
      // modal delete ends

  return (
    <>
      <Row>
        <Col className="header-table-model">
          <h1>Exibindo Cliente</h1>
        </Col>
        <Col style={{textAlign:'right'}}>
          <Button color="secondary"  href={'/clients/edit/' + id}><FaPen></FaPen></Button>
          &nbsp;
          <Button color="danger" onClick={ev => onDeleteClick(data)}><FaTrash></FaTrash></Button>
        </Col>
      </Row>
      <Row className="card animated fadeInDown">
        <Table>
          <tbody>
            <tr>
              <td>
              Nome: {data.name}
              </td>
              <td>
              E-mail: {data.email}
              </td>
            </tr>
            <tr>
              <td>
              CPF: {data.cpf}
              </td>
              <td>
              RG: {data.rg}
              </td>
            </tr>
            <tr>
              <td>
              Rua: {data.street}
              </td>
              <td>
              Numero: {data.number}
              </td>
            </tr>
            <tr>
              <td>
              Bairro: {data.neighbor}
              </td>
              <td>
              Cidade: {data.city}
              </td>
            </tr>
            <tr>
              <td>
                Cep: {data.cep}
              </td>
              <td>
                Data de criação: {data.created_at}
              </td>
            </tr>
            <tr>
              <td>
                Contato: {data.contact}
              </td>
              <td>
                Contato Alternative: {data.contact_alternative}
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="state-grid">
         <div className="title-view"><h3>Real State</h3></div>
         <div className="body-view">
         {Object.keys(owner).map(key => (
              <Link className="link-states-grid" key={key} to={`/states/show/ ${owner[key].id}`}><h5><FaLink></FaLink> {owner[key].street} - {owner[key].number}</h5></Link>              
            ))}
         </div>
        </div>
      </Row>
      <ModalDelete show={show} handleClose={handleClose} user={clientDelete}/>
              
    </>
  )
}
