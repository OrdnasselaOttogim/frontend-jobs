import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import BASE_PATH from '../BASE_PATH';

export default function EditJob() {

    let navigate = useNavigate();

    const {id} = useParams();

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


    useEffect(() => {
        loadJob();
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(BASE_PATH + `/api/v1/job/${id}`, job, {
            headers : {
              "Authorization" : `Bearer ${localStorage.getItem("jwt_token")}`
            } 
          });
        navigate("/");
    };

    const loadJob = async () => {
        const result = await axios.get(BASE_PATH + `/api/v1/job/${id}`, {
            headers : {
              "Authorization" : `Bearer ${localStorage.getItem("jwt_token")}`
            } 
          });
        setJob(result.data);
    };


  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit your job proposal </h2>

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
