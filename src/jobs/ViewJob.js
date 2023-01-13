import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BASE_PATH from "../BASE_PATH";

export default function ViewJob(){

    const [job, setJob] = useState({
        title: "",
        description: "",
        category: "",
        address: ""
    });

    const {id} = useParams();

    useEffect(() => {
        loadJob()
    }, []);


    const loadJob = async () => {
        const result = await axios.get(BASE_PATH + `/api/v1/job/${id}`, {
            headers : {
              "Authorization" : `Bearer ${localStorage.getItem("jwt_token")}`
            } 
          });
        setJob(result.data);
    };


    return(
        <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Job Details </h2>
               
                <Link className="btn btn-primary my-2" to={`/viewJob/${id}/Map`} state={{job: job}}>Map</Link>

                <div className="card">
                    <div className="card-header">
                        Details of job id: {job.id}
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <b>Title:</b>
                                {job.title}
                            </li>
                            <li className="list-group-item">
                                <b>Description:</b>
                                {job.description}
                            </li>
                            <li className="list-group-item">
                                <b>Category:</b>
                                {job.category}
                            </li>
                            <li className="list-group-item">
                                <b>Address:</b>
                                {job.address}
                            </li>
                        </ul>
                    </div>
                </div>
                <Link className="btn btn-primary my-2" to={"/"}>Back to home</Link>
        </div>
        </div>
            </div>

    );
}