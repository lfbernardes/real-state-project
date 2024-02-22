import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import Paginate from "../components/Pagination.jsx";

import {Button, Col, Row, Spinner, Table} from "reactstrap";
import ModalDelete from "./ModalDelete";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

export default function Clients() {

  const [client, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [btnnext, setBtnnext] = useState(false);
  const [btnprev, setBtnprev] = useState(false);

  const [show, setShow] = useState(false);
  const [userDelete, setUserdelete] = useState({});

  //pagination
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = async () => {
    setLoading(true)
    const response = await axiosClient.get(`/clients?page=${currentPage}`);
    setLoading(false)
    setData(response.data.data);
    setItemsPerPage(response.data.itemsPerPage);
    setTotalItems(response.data.totalItems);
  }
  useEffect(() => {
      fetchData()
  }, [currentPage]);

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
  }

  const handleShow = () => setShow(true);
  const handleClose = (client) => {
    if(client.id == ''){
      setShow(false);
    }else{
      axiosClient.delete(`/clients/${client.id}`)
      .then((resp) => {
        setShow(false);
        fetchData()
      })
      .catch((err) => {
      })
    }
    
  }

  const onDeleteClick = user => {
    setUserdelete(user)
    handleShow()
  }

  return (
    <>
      <Row>
        <Col className="header-table-model">
          <h1>Clientes</h1>
          <Button color="success" href="/clients/new">Adicionar novo</Button>
        </Col>
      </Row>
      <Row className="card animated fadeInDown">
        <Table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data de criação</th>
            <th>Ações</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" className="text-center">
              <Spinner>
                Loading...
              </Spinner>
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {data.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Button color="primary"  href={'/clients/show/' + u.id}><FaEye></FaEye></Button>
                  &nbsp;
                  <Button color="secondary"  href={'/clients/edit/' + u.id}><FaPen></FaPen></Button>
                  &nbsp;
                  <Button color="danger" onClick={ev => onDeleteClick(u)}><FaTrash></FaTrash></Button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </Table>
      </Row>
        {!loading &&
          <Row>
            <Col className="col-btn-success">
              <div>
                {data.map(item => (
                    <div key={item.id}>{item.title}</div>
                ))}
                <Paginate currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} paginate={paginate} />
              </div>
            </Col>
          </Row>
        }
      <ModalDelete show={show} handleClose={handleClose} user={userDelete}/>
    </>
  )
}