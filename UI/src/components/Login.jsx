import React, { useState } from 'react';
import axios from "axios"
import "./login.css"

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let [msg, setMsg] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login or registration logic here

        let request = JSON.stringify({
            "email": email,
            "password": password
        })
        axios.post("http://localhost:3001/api/auth/login", request, {
            headers:{
                "Content-Type": "application/json"
            }
        } )
            .then((res) => {
                console.log(res);
                // props.handleUser(res);
            })
            .catch(err => console.log(err));
        // Reset the form


        setEmail('');
        setPassword('');
    };

    // useEffect(()=>{
    //     let request = {
    //         "email":email,
    //         "password": password
    //     }
    //     axios.post("http://localhost:3001/api/auth/login", request)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err));
    //     return{

    //     }
    // },[])


    return (
        <div className="login-container">
            <h2 style={{ color: "#007bff" }}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                        className="form-control-input"
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="form-control-input"
                    />
                </div>
                <button type="submit" className="submit-btn">
                    Login
                </button>
            </form>
            <div className="subscript">
                <p>
                    Don't have an account? <button onClick={() => props.handleLogin()}>Register</button>
                </p>
                <p>
                    <a href="/forgotpassword" className='small-links'>Forgot your password?</a>
                </p>
            </div>
        </div>
    );
};

export default Login;