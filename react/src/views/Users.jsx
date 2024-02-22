import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Button, Col, Row, Spinner, Table} from "reactstrap";
import ModalDelete from "./ModalDelete";
import Paginate from "../components/Pagination.jsx";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [userDelete, setUserdelete] = useState({});
  const navigate = useNavigate();

  //pagination
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const fetchData = async () => {
    setLoading(true)
    const response = await axiosClient.get(`/users?page=${currentPage}`);
    setLoading(false)
    setData(response.data.data);
    setItemsPerPage(response.data.itemsPerPage);
    setTotalItems(response.data.totalItems);
  }
  useEffect(() => {
      fetchData();
  }, [currentPage]);

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
  }

  const handleShow = () => setShow(true);
  const handleClose = (user) => {
    if(user.id == ''){
      setShow(false);
    }else{
      axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setShow(false);
        fetchData();
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
          <h1>Usuários</h1>
          <Button color="success" href="/users/new">Adicionar novo</Button>
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
                <Button color="primary"  href={'/users/show/' + u.id}><FaEye></FaEye></Button>
                  &nbsp;
                  <Button color="secondary"  href={'/users/edit/' + u.id}><FaPen></FaPen></Button>
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
