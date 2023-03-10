import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

    require('dotenv').config();

    const oauthUrl = process.env.REACT_APP_OAUTH_SERVICE_URL;
    console.log("oauthurl=" + oauthUrl);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Job offers bulletin board</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <Link className='btn btn-outline-light' to="/login">Login</Link>
                    <Link className='btn btn-outline-light' to="/register">Register</Link>
                    <a className='btn btn-outline-light' href={oauthUrl}>RegisterGoogle</a>
                    <Link className='btn btn-outline-light' to="/addjob">AddJob</Link>
                </div>
            </nav>
        </div>
    )
}