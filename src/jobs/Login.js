import { useRef, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import React from 'react';
import BASE_PATH from '../BASE_PATH';


const LOGIN_URL = BASE_PATH + '/token';

const Login = () => {
    
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [token, setToken] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                {},
                {
                    auth: { "username": user,
                            "password": pwd }
                }
            );
            
            console.log(JSON.stringify(response));
            
            const accessToken = response.data.token;
            const role = response.data.role;
            setToken(accessToken);
            localStorage.setItem("jwt_token", accessToken);
            localStorage.setItem("role", role);

            console.log("access token: " + accessToken + "\nRole: " + role);
            
            setUser(user);
            setPwd(pwd);
            setSuccess(true);
        } catch (err) {
             
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in as {user}</h1>
                    <br />
                    <p>your JWT token is {localStorage.getItem("jwt_token")}</p>
                    <p>
                        <a href="/">Go to Home</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/register">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login;