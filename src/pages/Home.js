import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, /*useParams*/ } from 'react-router-dom';
import BASE_PATH from '../BASE_PATH';

export default function Home() {

const [jobs,setJobs]=useState([]);

//const {id} = useParams();

useEffect(()=>{
    loadJobs();
},[]);

const loadJobs = async() => {
    const result= await axios.get(BASE_PATH + "/api/v1/job", {
      headers : {
        "Authorization" : `Bearer ${localStorage.getItem("jwt_token")}`
      } 
    });
    setJobs(result.data);
};



const deleteJob = async (id) => {
  if(localStorage.getItem("role") === "[ADMIN]"){
  await axios.delete(BASE_PATH + `/api/v1/job/${id}`, {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("jwt_token")}`
    } 
  });
  loadJobs();
}else{
  alert("Only administrators can edit jobs!")
}
};

  return (
    <div className='container'>
        <div className='py-4'>


        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Category</th>
      <th scope="col">Title</th>
      <th scope="col">Address</th>
      
    </tr>
  </thead>
  <tbody>

    {
        jobs.map((job, index) => (
            <tr>
            
            <td>{job.id}</td>
            <td>{job.category}</td>
            <td>{job.title}</td>
            <td>{job.address}</td>
            <td>
                <Link className='btn btn-primary mx-2' to={`/viewJob/${job.id}`}>View</Link> 
                <Link className='btn btn-outline-primary mx-2' to={`/editjob/${job.id}`}>Edit</Link> 
                
                <button className='btn btn-danger mx-2' onClick={() => deleteJob(job.id)}>Delete</button>
            </td>
            </tr>
        ))
    }
    
    
  </tbody>
</table>


        </div>
    </div>
  )
}
