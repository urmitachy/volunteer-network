import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import volunteer from '../../image/logos/users-alt 1.png';
import plusLogo from '../../image/logos/plus 1.png';
import logo from '../../image/logos/Group 1329.png'
import './AddEvent.css';


const AddEvent = () => {

    let history = useHistory();
    const design = {width: '16%' }
    const {register, handleSubmit } = useForm();
    const onSubmit = data => {
        fetch('https://immense-oasis-69260.herokuapp.com/addEvents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    history.push("/home");
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
                <div>  <Link to='/people'>
                    <img src={volunteer} alt=''/>
                    <h6>Volunteer Registration List</h6>
                    </Link>
                </div>
               
                    <div>
                        <img src={plusLogo} alt=''/>
                        <h6>Add Event</h6>
                    </div>
                \
            </div>
            <div className='admin-page-content'>
            <form class='upload-form' onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor='title'>Event Title</label><label htmlFor='date'>Event Date</label><br/>
                        <input name="eventName" type="text" placeholder="Event Title" id='title'  ref={register}/>                       
                        <input name="eventDate" type="date" id='date'  ref={register} /><br/>
                        <label htmlFor='description'>Description</label><label htmlFor='image'>Banner</label><br/>                       
                        <input type="text" placeholder="Enter Description" id='description'  ref={register}/>
                        <input name="image" type="text" placeholder="Paste Image URL" id='image'  ref={register}/><br/>
                        <div className='text-right'><input  style={{width: '90px'}} className='btn btn-primary' type="submit" /></div>
                    </form>
            </div>
        </div>
   </div>
    );
};

export default AddEvent;