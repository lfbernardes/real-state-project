import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, Col, Row } from 'reactstrap';
import axiosClient from "../axios-client.js";
import ModalLink from '../components/scheduler componentes/ModalLink'
import ModalDelete from '../components/scheduler componentes/ModalDelete'
import '../components/scheduler componentes/calendarStyles.css';
import { FaAddressBook, FaFileExcel, FaFileMedical, FaPen, FaRegCalendarPlus, FaRegTrashAlt } from "react-icons/fa"
import { Link } from 'react-router-dom';
import moment from 'moment';


function Calendar() {
  const [date, setDate] = useState(new Date());
  const [auxDate, setAuxDate] = useState('');
  const [view, setView] = useState('Mês');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [tempID, setTempId] = useState();
  const [apt, setApt] = useState([]);
  const [scheduleTime, setScheduleTime] = useState({
    title: '',
    description:'',
    initial_date: '',
    initial_time: '',
    end_date: '',
    end_time:''
  });

  const handleShowDeleteBtn = (id) => {
    setTempId(id)
    setShowDeleteBtn(true)
  }
  const handleCloseDeleteBtn = (appointment) => {
    if(appointment.id == ''){
      setShowDeleteBtn(false);
    }else{
      axiosClient.delete(`/schedules/${appointment.id}`)
      .then(() => {
        setShowDeleteBtn(false);
        fetchData(new Date(auxDate+'T12:00'))
      })
    }
    
  }

  useEffect(() => {
      fetchData(date);
  }, []);

  const fetchData = async (aux_d) => {
    // setLoading(true)
    // const response = await axiosClient.get('/schedules');
    // setLoading(false)
    // setResponse(response.data);
    console.log('const dataAtual = aux_d;')
    console.log(aux_d)
    console.log('const dataAtual = aux_d;')

    const dataAtual = aux_d;
    const dia = dataAtual.getDate();
    const mes = dataAtual.getMonth() + 1; // Os meses são indexados em zero
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
    setAuxDate(dataFormatada)
    console.log('dataFormatada')
    console.log(dataFormatada)
    console.log('dataFormatada')
    console.log(dataFormatada)
    
    const formData = new FormData();
    formData.append('data', dataFormatada)
    formData.append('month', mes)
    formData.append('year', ano)
    formData.append('target', 'month')

    const teste = await axiosClient.post(`/appointments`, formData,{
      headers:{
        'content-type' : 'multipart/form-data'
      }})
      .then((appointments) => {
        setResponse(appointments.data)
        console.log('appointments.data')
        console.log(appointments.data)
      })
      .catch(err => {
        console.log("error appointments")
        console.log(err)
      })
  }
  const prev = () => {
    switch (view) {
      case 'Mês':
        setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
        fetchData(new Date(date.getFullYear(), date.getMonth() - 1, 1))
        break;
      case 'Semana':
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7));
        fetchData()
        break;
      case 'Dia':
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1));
        const dateObj = moment(auxDate, 'YYYY-MM-DD');
        const prevDayObj = dateObj.subtract(1, 'days');
        const prevDayStr = prevDayObj.format('YYYY-M-D');
        fetchData(new Date(prevDayStr))
        setView('Dia')
        break;
      default:
        break;
    }
  };

  const next = () => {
    switch (view) {
      case 'Mês':
        setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
        fetchData(new Date(date.getFullYear(), date.getMonth() + 1, 1))
        break;
      case 'Semana':
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7));
        fetchData()
        break;
      case 'Dia':
        setDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1));
        const dateObj = moment(auxDate, 'YYYY-MM-DD');
        const nextDayObj = dateObj.add(1, 'days');
        const nextDayStr = nextDayObj.format('YYYY-M-D');
        fetchData(new Date(nextDayStr))
        setView('Dia')
        break;
      default:
        break;
    }
  };
  function fetch_aux_date(value){
    // debugger
    let month = ''
    let day = ''
    if(value < 10){
      day = '0'+value
    }else{
      day = value
    }
    // debugger
    const selectedDay = date.getDate()
    const selectedMonth = date.getMonth()+1
    if(selectedMonth < 10){
      month = '0'+selectedMonth
    }else{
      month = selectedMonth
    }
    // debugger
    const selectedYear = date.getFullYear()
    const selectedData = new Date(selectedYear+'-'+month+'-'+day+'T12:00')
    // debugger
    setAuxDate(selectedYear+'-'+month+'-'+day)
    setView('Dia')
  }

  function modalResponse () {
    return scheduleTime
  }

  const handleShow = (value) => {

    if(value != 'new'){
      const formData = {
        title: value.title,
        selected_date: value.selected_date,
        selected_time: value.selected_time,
        description: value.description
      }
      setScheduleTime(value)
      setShow(true);
    }else{
      const formData = {
        title: '',
        selected_date: '',
        selected_time: '',
        description: ''
      }
      setScheduleTime(formData)
      setShow(true);
    }
    
  }
  const handleClose = () => {
    fetchData(new Date(auxDate+'T12:00'))
    setShow(false)   
  }

  function properties(){
    return response
  }
  function fetch_data(value){
    fetchData(date)
    setView(value)
  }

  const getDaysInMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const renderMonthView = () => {
    let t_render = false
    t_render =setTimeout(() => {
      console.log("timeout")
      return true
    }, 5000);
    if(t_render == false){
      return <div className="row-header" ><h1>carregando...</h1></div>
    }else{
      const daysInMonth = getDaysInMonth();
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
      const monthDays = [];
      const aux = new Date()
      let classname = ''
      const dayOfMonth = aux.getDate();

      const selectedDay = date.getDate()
      const selectedMonth = date.getMonth()+1
      const selectedYear = date.getFullYear()
      const selectedData = selectedYear+'-'+'0'+selectedMonth+'-'+'0'+selectedDay


      if(date.getMonth() == aux.getMonth()){
        classname = 'day-active'
      }else{
        classname = 'day'
      }


      for (let i = 1; i <= daysInMonth; i++) {
        monthDays.push(i);
      }

      for (let i = 0; i < firstDayOfMonth; i++) {
        monthDays.unshift(null);
      }

      const rows = [];
      let cells = [];

      // month -------------------------------------------------------------------------
      const aux_p = properties()

      monthDays.forEach((day, i) => {
        let flag = false
        for(let i =0; i<aux_p.length; i++){
          if(aux_p[i].day == day){
            flag = true
            break
          }
        }
        if (i % 7 !== 0) {
          if(flag){
            cells.push(day ? <div  className={day === dayOfMonth ? classname: 'day'} key={i}>{day}<br></br><Link onClick={ev => fetch_aux_date(day)}><FaAddressBook style={{color:'red', fontSize:'20px'}}/></Link></div> : <div className="day" key={i}></div>);
          }else{
            cells.push(day ? <div  className={day === dayOfMonth ? classname: 'day'} key={i}>{day}</div> : <div className="day" key={i}></div>);
          }
          
        } else {
          if(flag){
            rows.push(cells);
            cells = [];
            cells.push(day ? <div className={day === dayOfMonth ? classname: 'day'} key={i}>{day}<br></br><Link onClick={ev => fetch_aux_date(day)}><FaAddressBook style={{color:'red', fontSize:'20px'}}/></Link></div> : <div className="day" key={i}></div>);
          }else{
            rows.push(cells);
            cells = [];
            cells.push(day ? <div className={day === dayOfMonth ? classname: 'day'} key={i}>{day}</div> : <div className="day" key={i}></div>);
          }
        }

        if (i === monthDays.length - 1) {
          rows.push(cells);
        }
      });

      return rows.map((row, i) => {
        return <div className="row-header" key={i}>{row}</div>
      });
    }
  };
  const renderWeekName = () =>{
    const weekdays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return (
      <div className="row-week-name">
        {weekdays.map(day => (
          <div className="day-name" key={day}>
          {/* <div className="day-header">{day.toLocaleDateString('pt-BR', { weekday: 'short' })}</div> */}
          <div className="day-number">{day}</div>
        </div>
        ))
        }
      </div>
    )
  }

  const renderWeekView = () => {
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    const weekDays = [];
    const currDate = new Date(date);
    currDate.setDate(currDate.getDate() - currDate.getDay());
    const aux = new Date()
    let classname = ''
    const dayOfMonth = aux.getDate();

    if(date.getMonth() == aux.getMonth()){
      classname = 'day-active'
    }else{
      classname = 'day'
    }

    for (let i = 0; i < 7; i++) {
      weekDays.push(new Date(currDate));
      currDate.setDate(currDate.getDate() + 1);
    }

    return (
      <>
        {renderWeekName()}
        <div className="row-header">
          {weekDays.map(day => (
            <div className={day.getDate() === dayOfMonth ? classname: 'day'} key={day.getDate()}>
            {/* <div className="day-header">{day.toLocaleDateString('pt-BR', { weekday: 'short' })}</div> */}
            <div >{day.getDate()}</div>
          </div>
          ))
        }
        </div>
      </>
    )
  }
  const renderDayView = () => {
    const hours = [
      '00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'
    ]

    // const dataAtual = auxDate//date;
    // const dia = dataAtual.getDate();
    // const mes = dataAtual.getMonth() + 1; // Os meses são indexados em zero
    // const ano = dataAtual.getFullYear();
    const dataFormatada = auxDate//`${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
    console.log('auxDate')
    console.log(auxDate)
    const appointments = []
    for(let i=0; i<response.length; i++) {
      if(response[i].selected_date === dataFormatada){
        appointments[i] = response[i]
      }
    };  
    
    return (
      <div>
        {appointments &&
          appointments.map((appointment, id) => (
            <div className='day-time' key={id}>
            <Card className="sm-3">
              <CardHeader>
                <Row>
                  <Col sm="6">
                    <span>Agendamento para:</span>
                    <p style={{fontWeight: 'bold'}}>
                      {appointment.title}
                    </p>
                  </Col>
                  <Col sm="2">
                    <span>Data:</span>
                    <h5 style={{fontWeight: 'bold'}}>{appointment.selected_date}</h5>
                  </Col>
                  <Col sm="2">
                    <span>Horário:</span>
                    <h5 style={{fontWeight: 'bold'}}>{appointment.selected_time}</h5>
                  </Col>
                  <Col sm="2">
                    <FaPen className='icon' color='blue' onClick={() => handleShow(appointment)}/>
                    <FaRegTrashAlt onClick={ev => handleShowDeleteBtn(appointment.id)} className='icon' color='red'/>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <CardText>
                  <span>{appointment.description}</span>
                </CardText>
              </CardBody>
            </Card>
            </div>
          ))
        }
        {appointments.length == 0 &&
          <div>
            <Row className='no-resgister'>
              <Col >
                <h5>Você ainda não tem agendamentos para esta data!</h5>
                <FaFileExcel style={{fontSize: '50px'}}/>
              </Col>
            </Row>
          </div>
        }
        
      </div>
      // <div className="row-header">
      //   <div className="day">
      //     <div className="day-header">{date.toLocaleDateString('pt-BR', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
      //     {/* <div className="day-number">{date.getDate()}</div> */}
      //   </div>
      // </div>
    );
  };

  const renderLoading = (arg) => {
    return(
      <>
        <Row>
          <Col>Loading...</Col>
        </Row>
      </>
    ),
    setTimeout(() => {
    // Do something else here after 3 seconds
      setView('Dia')
    }, 3000);
  }

  const renderDateDay = () =>{
    let year, month, day;
    [year, month, day] = auxDate.split('-');
    year = parseInt(year)
    month = parseInt(month)
    day = parseInt(day)
    let esp_date = new Date(year+'-'+month+'-'+day)

    return(
      <div>
        <div>{esp_date.toLocaleDateString('pt-BR', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
      </div>
    )


  }
    
  return (
    <div className="calendar">
      <Row className="current-view">
        {/* <Col><h3>Visualizando:{view}</h3></Col> */}
        {view === 'Mês' && 
          <div className="date" style={{fontWeight: 'bold', fontSize: '30px'}}>{date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </div>
        }
        {view === 'Semana' && 
          <div className="date" style={{fontWeight: 'bold', fontSize: '30px'}}>{date.toLocaleDateString('pt-BR', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        }
        {view === 'Dia' && 
          <div className="date" style={{fontWeight: 'bold', fontSize: '30px'}}>
            {renderDateDay()}
          </div>
        }
        
      </Row>
      <Row className="toolbar">
        <Col>
        <div className="date-controls">
          <Button className="prev-button" onClick={prev}>Anterior</Button>
          
          <Button className="next-button" onClick={next}>Próximo</Button>
        </div>
        </Col>
        <Col>
        <div className="view-controls">
          <Button className={view === 'Mês' ? 'active' : ''} onClick={() => fetch_data('Mês')}>Mês</Button>
          {/* <Button className={view === 'Semana' ? 'active' : ''} onClick={() => setView('Semana')}>Semana</Button> */}
          <Button className={view === 'Dia' ? 'active' : ''} onClick={() => setView('Dia')}>Dia</Button>
          <Button className='add-register' onClick={() => handleShow('new')}><FaRegCalendarPlus/></Button>
        </div>
        </Col>
      </Row>
      <Row>
        {view === 'Mês' && 
          <>
            {renderWeekName()}
            {renderMonthView()}
          </>
        }
        {view === 'Semana' && renderWeekView()}
        {view === 'Dia' && renderDayView()}
        {view === 'loading' && renderLoading()}
      </Row> 
      <ModalLink show={show} handleClose={handleClose} values={modalResponse()} />
      <ModalDelete showModalDelete={showDeleteBtn} closeModalDelete={handleCloseDeleteBtn} appointment={tempID}/>       
    </div>
  );
}
  
export default Calendar;