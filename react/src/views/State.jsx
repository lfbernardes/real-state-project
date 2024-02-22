import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Button, Col, Row, Spinner, Table} from "reactstrap";
import ModalDelete from "./ModalDelete";
import Paginate from "../components/Pagination.jsx";
import Select from 'react-select';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { FaEye, FaPen, FaTrash } from "react-icons/fa";

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [userDelete, setUserdelete] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [dataSearch, setDataSearch] = useState([]);

  //pagination
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
      const fetchData = async () => {
        setLoading(true)
        const response = await axiosClient.get(`/states?page=${currentPage}`);
        setLoading(false)
        setData(response.data.data);
        setItemsPerPage(response.data.itemsPerPage);
        setTotalItems(response.data.totalItems);
      }
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
      axiosClient.delete(`/states/${user.id}`)
      .then((response) => {
        setShow(false);
        getUsers()
      })
    }
  }
  
  const onDeleteClick = user => {
    setUserdelete(user)
    handleShow()
  }

  const effect_data_search = async () =>{
    const response = await axiosClient.post('/states/search', {searchTerm});
    console.log(response.data)
    setDataSearch(response.data);
    setData(response.data)

  }
  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    effect_data_search()
  };

  return (
    <>
      <Row>
        <Col className="header-table-model">
          <h1>Imóveis</h1>
          <Button color="success" href="/states/new">Adicionar novo</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          
          <div style={{marginBottom:'20px', marginTop:'20px'}}>
            <input type="text" value={searchTerm} onChange={handleSearch} style={{borderRadius:'10px'}} placeholder="Pesquisar..."/>
            {/* {dataSearch.map((item) => (
              <div key={item.id}>{item.street} - {item.short_description} - {item.neighbor}</div>
            ))} */}
          </div>
        </Col>
      </Row>
      <Row className="card animated fadeInDown">
        <Table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Descricão</th>
            <th>Situação</th>
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
                <td>{u.short_description}</td>
                <td>{u.situation}</td>
                <td>{u.created_at}</td>
                <td>
                  <Button color="primary"  href={'/states/show/' + u.id}><FaEye></FaEye></Button>
                  &nbsp;
                  <Button color="secondary"  href={'/states/edit/' + u.id}><FaPen></FaPen></Button>
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
