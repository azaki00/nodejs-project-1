import React, { useState } from 'react';
import "./login.css"

const Register = ( props ) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login or registration logic here
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        // Reset the form
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
    };


    return (
        <div className="login-container">
            <h2 style={{color: "#007bff"}}>Register</h2>
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
                    Register
                </button>
            </form>
            <div className="subscript">
                <p>
                    Have an account? <button onClick={() => props.handleLogin()}>Login</button>
                </p>
            </div>
        </div>
    );
};

export default Register;