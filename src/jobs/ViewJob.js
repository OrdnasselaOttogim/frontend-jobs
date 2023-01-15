import axios, {options} from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BASE_PATH from "../BASE_PATH";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewJob(){

    const [job, setJob] = useState({
        title: "",
        description: "",
        category: "",
        address: ""
    });

    //state and function to store old language key (default state is set as English)
    const [oldLanguageKey, setOldLanguageKey] = useState("en");

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

    const toastId = React.useRef(null);
    const notify = () => toastId.current = toast("Translating...", {
        autoClose: false
    });

    const success = () => toast.success("Translated!", {
        autoClose: 5000,
        hideProgressBar: true
    });

    //function that targets the select tag value
    const translateText  = async (selectedLanguage) => {

        //console.log("Old Language: " + oldLanguageKey);
        //console.log("New Language: " + selectedLanguage.target.value);
        notify();
        // Data is the body of the POST Request for LibreTranslate
        let data = {
            q: job.title,
            source: oldLanguageKey,
            target: selectedLanguage.target.value,
        };

        let newTitle = String("");
        let newDescription = String("");
        let newCategory = String("");
        let newAddress = String("");

        await axios.post(`http://127.0.0.1:5000/translate`, data).then((response) => {
            newTitle = response.data.translatedText;
        });

        data.q = job.description
        await axios.post(`http://127.0.0.1:5000/translate`, data).then((response) => {
            newDescription = response.data.translatedText;
        });

        data.q = job.category
        await axios.post(`http://127.0.0.1:5000/translate`, data).then((response) => {
            newCategory = response.data.translatedText;
        });

        data.q = job.address
        await axios.post(`http://127.0.0.1:5000/translate`, data).then((response) => {
            newAddress = response.data.translatedText;
        });

        toast.dismiss(toastId.current);
        success();

        setJob({
            title: newTitle,
            description: newDescription,
            category: newCategory,
            address: newAddress
        });

        // After the website is translated, we set the old key to be the new language
        setOldLanguageKey(selectedLanguage.target.value);
    };

    return(
        <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <select className="select" onChange={translateText}>
                    <option>en</option>
                    <option>it</option>
                    <option>de</option>
                </select>
                <ToastContainer />
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