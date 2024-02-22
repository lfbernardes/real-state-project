import {Form, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState, ChangeEvent} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import Badge from 'react-bootstrap/Badge';
import Select from 'react-select';
import {Button, Row, Col, Input, Container, Label, Spinner} from "reactstrap";
import { FaBackspace } from "react-icons/fa";
import ModalDelete from "./ModalDelete.jsx";


export default function UserForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const {setNotification} = useStateContext()
  let {id} = useParams();
  const [images, setImages] = useState([])
  const [auxImages, setAuxImages] = useState([])
  const [clients, setClients] = useState([])
  const [imageDelete, setImageDelete] = useState([])
  const [show, setShow] = useState(false);

    const [imovel, setImovel] = useState({
      client_id: '',
      short_description: '',
      situation: 'Novo',
      avaliable: '',
      street: '',
      state_number: '',
      neighbor: '',
      city: '',
      cep: '',
      path_image: [],
      aux_image: [],
      images: [],
      long_description: '',
      id: null,
      owner: 'Pesquisar dono da propriedade...',
      clients: []
  })

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/states/${id}`)
        .then(({data}) => {
          setLoading(false)
          setImovel(data)
        })
        .catch((err) => {
          console.log('erro')
          console.log(err)
          setLoading(false)
        })
    }, [])
  }else{
    useEffect(() => {
      setLoading(true)
      axiosClient.get('/clients/get')
        .then(({data}) => {
          setLoading(false)
          setImovel({...imovel, clients: data})
          setClients(data)
        })
        .catch((er) => {
          setLoading(false)
          console.log(er)
        })
    }, [])
  }  

  function handleCheckbox(){
    if(imovel.avaliable === 1){
      setImovel({...imovel,avaliable: 0})
    }else{
      setImovel({...imovel,avaliable: 1})
    }
  }

  // delete images
  const handleShow = () => setShow(true);
  const handleClose = (response) => {
    if(response.id == ''){
      setShow(false);
    }else{
      axiosClient.post(`/states/delete-images/`, imageDelete)
      .then((erro) => {
        setShow(false);
      })
    }
  }

  const deleteImage = (image_id) => {
    setImageDelete(image_id)
    handleShow()
  }

  function handleFileChange(e) {
    const files = e.target.files;
    const formData = new FormData();
    const urls = [];
    const img = []

  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append('images[]', file);
      img.push(files);
      const url = URL.createObjectURL(file);
      urls.push(url);
    }
    if(id){
      setImovel({
        ...imovel, 
        aux_image:urls
      })
      setAuxImages(files)
    }else{
      setImovel({
        ...imovel, 
        path_image:urls
      })
      setImages(files)
    }
  }

  const onSubmit = ev => {
    ev.preventDefault()
    console.log(imovel)
    if (imovel.id) {
      setBtnLoading(true)
      console.log('imovel id')
      let data = new FormData();

      if(auxImages.length > 0){
        console.log('entrou for ++++++')
        for (let i = 0; i < auxImages.length; i++) {
          data.append('images[]', auxImages[i]);
        }
      }
      data.append('id', imovel.id);
      data.append('client_id', imovel.client_id);
      data.append('situation', imovel.situation);
      data.append('avaliable', imovel.avaliable);
      data.append('street', imovel.street);
      data.append('state_number', imovel.state_number);
      data.append('neighbor', imovel.neighbor);
      data.append('city', imovel.city);
      data.append('cep', imovel.cep);
      data.append('short_description', imovel.short_description);
      data.append('long_description', imovel.long_description);
      axiosClient.post(`/states/stupdate`,data,{
        headers:{
          'content-type' : 'multipart/form-data'
        }
      })
      .then((response) => {
        setBtnLoading(false)
        setNotification('O imóvel foi atualizado com sucesso!')
        navigate('/states')
      })
      .catch(err => {
        setBtnLoading(false)
        console.log(err)
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors)
          setErrors(response.data.errors)
        }
      })
    } else {
      
    const data = new FormData();
    for (let i = 0; i < images.length; i++) {
      data.append('images[]', images[i]);
    }
      
    data.append('client_id', imovel.client_id);
    data.append('situation', imovel.situation);
    data.append('avaliable', imovel.avaliable);
    data.append('street', imovel.street);
    data.append('state_number', imovel.state_number);
    data.append('neighbor', imovel.neighbor);
    data.append('city', imovel.city);
    data.append('cep', imovel.cep);
    data.append('short_description', imovel.short_description);
    data.append('long_description', imovel.long_description);
      setBtnLoading(true)
      axiosClient.post('/states', data, {
        headers:{
          'content-type' : 'multipart/form-data'
        }
      })
      .then(() => {
        setBtnLoading(false)
        setNotification('O imóvel foi criado com sucesso!')
        navigate('/states')
        })
        .catch(err => {
          console.log(err)
          console.log(err.response)
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <><div style={{display: 'flex', justifyContent: "space-between", alignItems: "center", backgroundColor:"#efefef", padding:" 0 10px 0 10px", borderRadius:"10px 10px 0 0 "}}>
        {imovel.id && <h1>Atualizar imóvel: {imovel.name}</h1>}
        {!imovel.id && <h1>Cadastrar novo imóvel</h1>}
      </div>

      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert-errors">
            {Object.keys(errors).map(key => (
              <p key={key}><Badge bg="danger">{errors[key][0]}</Badge></p>
            ))}
          </div>
        }
        {!loading && (
          <>
          <Form onSubmit={onSubmit} encType="multipart/form-data">
            <Container className="group-form-states" >
              <Row>
                <Col>
                <Select
                  options={imovel.clients.map(item => ({ value: item.id, label: `${item.id} -  ${item.name}` }))}
                  isSearchable={true}
                  placeholder={imovel.owner.name?imovel.owner.name+' || CPF: '+imovel.owner.cpf: 'Pesquisar proprietário:' }
                  value={imovel.owner.name?imovel.owner.name+' || CPF: '+imovel.owner.cpf:'Pesquisar proprietário:' } 
                  onChange={ev => {
                    const selectedClient = imovel.clients.find(client => client.id === ev.value);
                    setImovel({
                    ...imovel, 
                    client_id: ev.value,
                    owner: selectedClient
                  })}}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: 5,
                      borderColor: 'gray',
                      boxShadow: 'none',
                      margin: 10,
                    })
                  }}
                />
                </Col>
              </Row>
              <Row style={{marginBottom:'5px'}}>
                <Col>
                  <Input type="textarea" value={imovel.short_description} onChange={ev => setImovel({...imovel, short_description: ev.target.value})} placeholder="Descreva o imóvel em poucas palavras"/>
                </Col>
              </Row>
              <Row>
                <Col style={{paddingTop: "30px"}}>
                  <Input type="select" value={imovel.situation} onChange={ev => setImovel({...imovel, situation: ev.target.value})}>
                      <option disabled>Situação do imóvel:</option>
                      <option >Novo</option>
                      <option>Usado</option>
                  </Input>
                </Col>
                <Col>
                  <Label style={{paddingTop: "30px"}} check>
                    Imóvel esta disponível para negociações.
                    <Input checked={imovel.avaliable} onChange={handleCheckbox} type="checkbox" />
                  </Label>
                </Col>
              </Row><br/>
              <Row>
                <Label>Informações de endereço:</Label>
              </Row>
              <Row className="row-table">
                <Col xs="9">
                    <Input name="street" type="text" value={imovel.street} onChange={ev => setImovel({...imovel, street: ev.target.value})} placeholder="Rua"/>
                </Col>
                <Col xs="3">
                    <Input type="number" value={imovel.state_number} onChange={ev => setImovel({...imovel, state_number: ev.target.value})} />
                </Col>
              </Row>
              <Row className="row-table">
                <Col>
                    <Input type="text" value={imovel.neighbor} onChange={ev => setImovel({...imovel, neighbor: ev.target.value})} placeholder="Bairro"/>
                </Col>
                <Col>
                    <Input type="text" value={imovel.city} onChange={ev => setImovel({...imovel, city: ev.target.value})} placeholder="Cidade"/>
                </Col>
                <Col>
                    <Input type="text" value={imovel.cep} onChange={ev => setImovel({...imovel, cep: ev.target.value})} placeholder="CEP"/>
                </Col>
              </Row>
              <Row className="row-table">
                <Col>
                    <Input style={{height: '200px'}} type="textarea" value={imovel.long_description} onChange={ev => setImovel({...imovel, long_description: ev.target.value})} placeholder="Descrição do imóvel"/>
                </Col>
              </Row>
              <Row className="row-table">
                <Col xs="6"></Col>
                <Col xs="6">                  
                    <Input
                      type="file" 
                      name="file"
                      onChange={handleFileChange}
                      multiple 
                    />
                </Col>
              </Row>
              <Row>
                <Col>
                  {id &&
                    <div>
                      <div className="prevew-image-btn">
                      {imovel.path_image.map(url => (
                        <img key={url.created_at} src={url.url} className="red-image" onClick={ev => deleteImage(url)} />
                      ))}
                        <p>Clique sobre a imgem para excluir</p>
                      </div>
                      <div className="prevew-image-btn">
                        {imovel.aux_image.map(url => (
                          <img key={url} src={url} alt="Selected file" />
                        ))}
                      </div>
                    </div>
                  }
                  {!id &&
                    <div className="prevew-image-btn">
                      {imovel.path_image.map(url => (
                        <img key={url} src={url} alt="Selected file" />
                      ))}
                    </div>
                  }
                </Col>
              </Row>
              <Row>
                <Col className="btn-form-states">
                  {btnLoading && (
                    <Button disabled style={{margin:"0 10px 0 0"}} color="success">
                      <Spinner size="sm">
                        Loading...
                      </Spinner>
                      Salvar
                    </Button>
                  )}
                  {!btnLoading && (
                    <Button style={{margin:"0 10px 0 0"}} color="success">
                      Salvar
                    </Button>
                  )}
                </Col>
              </Row>
            </Container>            
          </Form>
        </>
      )}
      </div>
      <ModalDelete show={show} handleClose={handleClose} user={imageDelete}/>
    </>
  )
}
