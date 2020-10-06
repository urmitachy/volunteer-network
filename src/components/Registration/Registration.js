import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

const Registration = () => {
    let history = useHistory();
    const { eventName } = useParams();
    const { register,handleSubmit, errors } = useForm();
    const [events, setEvents] = useState([]);
    const selectedTask = events.find(task => task.eventName === eventName);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log(selectedTask)

    const selectedEvent ={...selectedTask} 
    const image = selectedEvent.image;

    useEffect(() => {
        fetch('https://immense-oasis-69260.herokuapp.com/events')
            .then(res => res.json())
            .then(data => setEvents(data))
    }, []);
    const onSubmit = data => {
        const newRegistration = {image, ...data };
        
        fetch('https://immense-oasis-69260.herokuapp.com/addRegistration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRegistration)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    history.push("/registrationList");
                }
                console.log(data);
               
            })
    }
    return (
        <div>

            <form class='upload-form' onSubmit={handleSubmit(onSubmit)}>
                    <input name="name" type="text" defaultValue={loggedInUser.name} placeholder="Full Name" ref={register} /><br/>
                    <input name="email" type="email" defaultValue={loggedInUser.email} placeholder="Enter email" ref={register({ required: true })} /><br/>
                    <input name="eventDate" type="date" ref={register({ required: true })} /><br/>
                    <input type="text" placeholder="Description" ref={register} /><br/>
                    <input name='eventName' type="text" defaultValue={eventName} placeholder="Enter Volunteer Activity" ref={register} /><br/>
                    {errors.exampleRequired && <span className='error'>This field is required</span>}
                    <input type="submit" />
                </form>     
        </div>
    );
};

export default Registration;