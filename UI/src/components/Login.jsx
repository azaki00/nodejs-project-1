import React, { useState } from 'react';
import "./login.css"

const Login = ({ props }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login or registration logic here
        console.log('Email:', email);
        console.log('Password:', password);
        // Reset the form
        setEmail('');
        setPassword('');
    };


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
                    {isLogin ? 'Login': 'Register'}
                </button>
            </form>
            <div className="subscript">
                <p>
                    Don't have an account? <button onClick={() => props.switcher()}>Register</button>
                </p>
                <p>
                    <a href="/forgotpassword" className='small-links'>Forgot your password?</a>
                </p>
            </div>
        </div>
    );
};

export default Login;