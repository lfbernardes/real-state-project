import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Button, Col, ListGroup, ListGroupItem, Row, Spinner, Table} from "reactstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import ModalDelete from "./ModalDelete";


export default function StateView(args) {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [stateDelete, setStateDelete] = useState({});
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
            console.log('id+++++++++')
            console.log(id)
            const response = await axiosClient.get(`/states/show/${id}`);
            setLoading(false)
            console.log('response.data.data+++')
            console.log(response)
            // debugger
            setOwner(response.data.data.owner)
            setData(response.data.data);
            console.log('response.data.data.path_image')
            console.log(response.data.data.path_image)
            let item = []
            for(let i=0; i< response.data.data.path_image.length; i++){
              item[i] = response.data.data.path_image[i].url
            }
            setImages(item)
            if(item.length > 0){
              console.log('item')
              setSelectedImage(item[0]);
            }
        }
        fetchData();
    }, [items]);      
    
      const handleClick = (image) => {
        setSelectedImage(image);
      };

      // modal delete
      const handleShow = () => setShow(true);
      const handleClose = (state) => {
        if(state.id == ''){
          setShow(false);
        }else{
          axiosClient.delete(`/states/${state.id}`)
          .then((response) => {
            setShow(false);
            navigate('/states')
          })
        }
        
      }
      const onDeleteClick = state => {
        setStateDelete(state)
        handleShow()
      }
      // modal delete ends
    
      const imageList = images.map((image, index) => {
        return (
          <div  key={index}>
            <img src={image} alt={`Image ${index + 1}`} onClick={() => handleClick(image)} style={{maxWidth:'100px', maxHeight:'100px', margin: '5px'}} />
          </div>
        );
      });


  return (
    <>
      <Row>
        <Col className="header-table-model">
          <h1>Exibindo imóvel</h1>
        </Col>
        <Col style={{textAlign:'right'}}>
          <Button color="secondary"  href={'/states/edit/' + id}><FaPen></FaPen></Button>
          &nbsp;
          <Button color="danger" onClick={ev => onDeleteClick(data)}><FaTrash></FaTrash></Button>
        </Col>
      </Row>
      <Row className="card animated fadeInDown">
        <Table>
          <tbody>
            <tr>
              <td>
              Proprietario: {owner.name}
              </td>
              <td>
              Este imóvel está: {data.avaliable == 1? 'Disponível': 'Indisponível'}
              </td>
            </tr>
            <tr>
              <td>
              Descrição: {data.short_description}
              </td>
            </tr>
            <tr>
              <td>
              Rua: {data.street}
              </td>
              <td>
              Numero: {data.state_number}
              </td>
              <td>
              Bairro: {data.street}
              </td>
            </tr>
            <tr>
              <td>
              Cidade: {data.city}
              </td>
              <td>
              Cep: {data.cep}
              </td>
              <td>
              Cep: {data.situation}
              </td>
            </tr>
            <tr>
              <td>
                Data de criação: {data.created_at}
              </td>
            </tr>
            <tr>
              <td>
                Observações: {data.long_description}
              </td>
            </tr>
          </tbody>
        </Table>
        <div className="image-grid">
          

          {selectedImage && (
            <div className="image-modal">
              <img src={selectedImage} alt="Selected Image" style={{maxWidth:'500px', maxHeight:'300px'}}  />
            </div>
          )}
          <div className="image-container">
          {imageList}
          </div>
        </div>
      </Row>
      <ModalDelete show={show} handleClose={handleClose} user={stateDelete}/>
              
    </>
  )
}
