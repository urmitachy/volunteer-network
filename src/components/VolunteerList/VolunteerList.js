import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../image/logos/Group 1329.png'
import deleteButton from '../../image/logos/trash-2 9.png';
import volunteer from '../../image/logos/users-alt 1.png';
import plusLogo from '../../image/logos/plus 1.png'

const VolunteerList = () => {
    const design = {width: '16%' }
    const [volunteerList, setVolunteerList] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        fetch('https://immense-oasis-69260.herokuapp.com/volunteers')
            .then(res => res.json())
            .then(data => setVolunteerList(data))
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
            <div>
            <div>
            <img src={logo} alt="" style = {design}/>
        </div>
        <div>
        <h5 className="offset-2 mt-4">Volunteer Registration List</h5>
        </div>
            </div>

            <div className='row'>
                <div className='sidebar'>
                    <div>
                        <img src={volunteer} alt=''/>
                        <h6>Volunteer Registration List</h6>
                    </div>
                    <Link to='/addEvent'>
                        <div>
                            <img src={plusLogo} alt=''/>
                            <h6>Add Event</h6>
                        </div>
                    </Link>
                </div>
                <div className='admin-page-content'>
                    <Table hover>                   
                        <thead style={{backgroundColor: '#dfe6e9', color: '#636e72' }}>
                            <tr>
                                <th>Name</th>
                                <th>Email ID</th>
                                <th>Registration Date</th>
                                <th>Volunteer List</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {volunteerList.map(activity => {
                            return (
                               <tbody>
                                    <tr>
                                        <td>{activity.name}</td>
                                        <td>{activity.email}</td>
                                        <td>{(new Date(activity.eventDate).toDateString('dd/MM/yyyy'))}</td>
                                        <td>{activity.eventName}</td>
                                        <td>
                                            <Button onClick={() => deleteEvent(activity._id)} variant="danger">
                                                <img style={{ width: '20px', height: '20px' }} src={deleteButton} alt="" />
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>                               
                            )
                        })}
                    </Table>
                </div>
            </div>
       </div>
    );
};

export default VolunteerList;