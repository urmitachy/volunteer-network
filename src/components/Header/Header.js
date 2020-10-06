import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Nav, Form, Button, FormControl, InputGroup, Card } from 'react-bootstrap';
import './Header.css';
import logo from '../../image/logos/Group 1329.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';


const Header = () => {
  const design = { width: '16%' }
  const [events, setEvents] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch('https://immense-oasis-69260.herokuapp.com/events')
      .then(res => res.json())
      .then(data => setEvents(data))
  }, [])


  return (
    <div className='container'>
      <Navbar>
        <img src={logo} alt="" style={design} />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Donation</Nav.Link>
            <Nav.Link><Link to='/registrationList'>Events</Link></Nav.Link>
            <Nav.Link href="#link">Blog</Nav.Link>

          </Nav>
          <Form inline>
            <Button className="register" variant="primary">Register</Button>
            <Button variant="dark"><Link to='/people'>Admin</Link></Button>

            <Button onClick={() => setLoggedInUser({})} variant="warning">Sign Out</Button>

          </Form>
        </Navbar.Collapse>
      </Navbar>




      <div>
        <h1 className="header">I GROW BY HELPING PEOPLE IN NEED.</h1>
        <InputGroup style={{ width: "500px", margin: "auto" }} size="lg" className="mb-3">
          <FormControl id="homepage-text" type="text" placeholder="search..." aria-label="Search..." aria-describedby="basic-addon2" />
          <br /><br />
          <InputGroup.Append>
            <Button variant="primary">Search</Button>
          </InputGroup.Append>
        </InputGroup>


      </div>

      <div className='row'>
        {events.map(task => {
          return (
            <div className='col-md-3 p-2'>
              <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src={task.image} />
                <Card.Body>
                  <Card.Title>{task.eventName}</Card.Title>
                  <Link to={"/registration/" + task.eventName}><Button variant="primary">Go registration</Button></Link>
                </Card.Body>
              </Card>
            </div>
          )

        })}

      </div>

    </div>
  );
};

export default Header;