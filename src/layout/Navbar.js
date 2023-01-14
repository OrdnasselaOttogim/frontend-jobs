import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

export default function Navbar() {

    const [Login, setLogin] = useState("Login");

    //state and function to store old language key (default state is set as English)
    const [oldLanguageKey, setOldLanguageKey] = useState("en");

    //function that targets the select tag value
    const translateText  = (selectedLanguage) => {

        console.log("Old Language: " + oldLanguageKey);
        console.log("New Language: " + selectedLanguage.target.value);

        // Data is the body of the POST Request for LibreTranslate
        let data = {
            q: Login,
            source: oldLanguageKey,
            target: selectedLanguage.target.value,
        };

        axios.post(`http://127.0.0.1:5000/translate`, data).then((response) => {
            console.log(response.data);
            setLogin(response.data.translatedText);
        });

        // After the website is translated, we set the old key to be the new language
        setOldLanguageKey(selectedLanguage.target.value);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Job offers bulletin board</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <Link className='btn btn-outline-light' key="{Login}" to="/login">{Login}</Link>
                    <Link className='btn btn-outline-light' to="/register">Register</Link>
                    <a className='btn btn-outline-light' href="http://localhost:8080">Register with Google</a><Link className='btn btn-outline-light' to="/register">Register</Link>
                    <Link className='btn btn-outline-light' to="/addjob">Add job</Link>
                    <select className="select" onChange={translateText}>
                        <option>en</option>
                        <option>it</option>
                        <option>de</option>
                    </select>
                </div>
            </nav>
        </div>
    )
}