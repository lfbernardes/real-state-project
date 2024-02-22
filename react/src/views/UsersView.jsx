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
    const [userDelete, setUserDelete] = useState({});
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
            const response = await axiosClient.get(`/users/${id}`);
            setLoading(false)
            setData(response.data)
        }
        fetchData();
    }, [items]);      
    

      // modal delete
      const handleShow = () => setShow(true);
      const handleClose = (user) => {
        if(user.id == ''){
          setShow(false);
        }else{
          axiosClient.delete(`/users/${user.id}`)
          .then((response) => {
            setShow(false);
            navigate('/users')
          })
        }
        
      }
      const onDeleteClick = user => {
        setUserDelete(user)
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
          <Button color="secondary"  href={'/users/edit/' + id}><FaPen></FaPen></Button>
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
          </tbody>
        </Table>
      </Row>
      <ModalDelete show={show} handleClose={handleClose} user={userDelete}/>
              
    </>
  )
}
