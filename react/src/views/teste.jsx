
<div className='day-time'>
<Card className="sm-3" style={{width: '18rem'}}>
<CardHeader>
<p style={{fontWeight: 'bold'}}>{appointment.title}</p>
</CardHeader>
<CardBody>
  
  <CardText>
    <p>Começa em: {appointment.initial_time}</p>
    <p>Temina em: {appointment.end_time}</p>
    <p style={{borderTop:'1px solid #ccc', borderRadius:'2px', padding:'10px'}}>{appointment.description}</p>
  </CardText>
</CardBody>
<CardFooter>
  <FaRegEye className='icon' color='green'/>
  <FaPen className='icon' color='blue'/>
  <FaRegTrashAlt className='icon' color='red'/>
</CardFooter>
</Card>
</div>


              {/* <Button color="secondary" onClick={ev => handleShow()}>{appointment.initial_time}</Button>
              
              <div className='appointments'>
                
                  <div className='appointments-link' key={id}>
                    <p>{appointment.title}</p>
                    <p>{appointment.initial_date}</p>
                    <p>{appointment.initial_time}</p>
                    <p>{appointment.end_date}</p>
                    <p>{appointment.end_time}</p>
                    <p>{appointment.description}</p>
                  </div>
              </div> */}