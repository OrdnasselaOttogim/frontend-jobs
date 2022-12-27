import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import BASE_PATH from '../BASE_PATH';

export default function AddJob() {

    let navigate = useNavigate();

    const [job, setJob] = useState({
        title:"",
        description:"",
        address:"",
        category:""
    });

    const {title, description, address, category} = job;

    const onInputChange = (e) => {
            setJob({...job,[e.target.name]:e.target.value});
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post(BASE_PATH + "/api/v1/job", job, {
            headers : {
              "Authorization" : `Bearer ${localStorage.getItem("jwt_token")}`
            } 
          });
        navigate("/");
    };


  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Create your job proposal </h2>

            <form onSubmit={(e)=>onSubmit(e)}>
                <div className='mb-3'>
                    <label htmlFor='title' className='form-label'>
                        Title
                    </label>
                    <input type={"text"}
                    className="form-control"
                    placeholder='Enter the title for your job'
                    name='title'
                    value={title}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='description' className='form-label'>
                        Description
                    </label>
                    <input type={"text"}
                    className="form-control"
                    placeholder='Enter the description for your job'
                    name='description'
                    value={description}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='address' className='form-label'>
                        Address
                    </label>
                    <input type={"text"}
                    className="form-control"
                    placeholder='Enter the address for your job'
                    name='address'
                    value={address}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='category' className='form-label'>
                        Category
                    </label>
                    <input type={"text"}
                    className="form-control"
                    placeholder='Enter the category for your job'
                    name='category'
                    value={category}
                    onChange={(e)=>onInputChange(e)}
                    />
                </div>
                <button type='submit' className='btn btn-outline-primary'>Submit</button>
                <Link className='btn btn-outline-danger mx-2' to="/">Cancel</Link>

            </form>


            </div>
        </div>
    </div>
  )
}
