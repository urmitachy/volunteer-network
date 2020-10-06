import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { Navbar, Nav, Form ,Button ,Card} from 'react-bootstrap';
import logo from '../../image/logos/Group 1329.png'
import { Link } from 'react-router-dom';

const RegistrationList = () => {
    const design = {width: '16%' }
    const [registeredItems, setRegisteredItems] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);    

    useEffect(() => {
        fetch('https://immense-oasis-69260.herokuapp.com/Registration?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}` }
        }
        )
            .then(res => res.json())
            .then(data => setRegisteredItems(data));
    }, [deleted])
    const deleteEvent = (id) => {
        fetch(`https://immense-oasis-69260.herokuapp.com/delete/${id}`, {
            method: 'DELETE',
               
        })
            .then(res => res.json())
            .then(data => {
                if(data) {
                    setDeleted(true)
                }
            })
    }
    
    return (

        <div>
            <div> <Navbar>
  <img src={logo} alt="" style = {design}/>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link><Link to='/home'>Home</Link></Nav.Link>
      <Nav.Link href="#link">Donation</Nav.Link>
      <Nav.Link><Link to='/registrationList'>Events</Link></Nav.Link>
      <Nav.Link href="#link">Blog</Nav.Link>
      <Button  variant="dark">{loggedInUser.name}</Button>
    </Nav>
    
  </Navbar.Collapse>
  </Navbar></div>
           <div>
           {registeredItems.map(activity => {
                return (
                    
                        <div className='col-md-3 p-2' style={{ width: '14rem', backgroundColor: "transparent" }}>
                        <Card.Img variant="top" src={activity.image} />
                        <Card.Body>
                        <Card.Title>{activity.eventName}</Card.Title>
                        <p>{(new Date(activity.eventDate).toDateString('dd/MM/yyyy'))}</p> 
                        <Button onClick={() => deleteEvent(activity._id)} variant="primary">cancel</Button>    
                        </Card.Body>
                        
                    </div>
                )
            }
                
                )}
           </div>


{/* <section className="row">
            <div className="col-md-6">
            
            {
                registeredItems.map(activity => {
                    return (
                        <div className='row my-2' style={{width: '450px', border: '1px solid lightgray'}}>
                            <div className='col-sm-5'>
                                <img style={{ width: '200px', height: 'auto'}} className='my-3' variant="top" src={activity.image} alt="" />
                            </div>                           
                            <div className='col-sm-4 offset-3  mt-3'>                           
                                <h5>{activity.eventName}</h5>
                                <p>{(new Date(activity.eventDate).toDateString('dd/MM/yyyy'))}</p>                           
                                <div className='text-right'>
                                    <Button 
                                    // onClick={() => deleteProduct(activity._id)} 
                                    variant="primary">Cancel</Button>
                                </div>
                            </div>                           
                        </div>
                    )
                })
            }
            </div>
            </section> */}
            
        </div>
    );
};

export default RegistrationList;