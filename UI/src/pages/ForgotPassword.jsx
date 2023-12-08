import React, { useState } from 'react';
import axios from "axios"
import "../components/login.css"

const ForgotPassword = (props) => {
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform login or registration logic here

        let request = JSON.stringify({
            "email": email
        })
        axios.post("http://localhost:3001/api/auth/forgotPassword", request, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                console.log(res);
                console.log("Check your email for reset Link");
                setEmailSent(true);
            })
            .catch(err => console.log(err));
        // Reset the form


        setEmail('');

    };


    return (
        <div className="login-container">
            {(!emailSent) ?
                <>
                    <h2 style={{ color: "#007bff" }}>Forgot Your Password?</h2>
                    <h5>
                        Enter your email so we can send you a reset link
                    </h5>
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
                        <button type="submit" className="submit-btn">
                            Send Reset Link
                        </button>
                    </form>
                    <div className="subscript">
                        <p>
                            <a href="/" className='small-links'>Back to login screen</a>
                        </p>
                    </div>
                </>
                :
                <>
                    <h2 style={{ color: "#007bff" }}>Email send!</h2>
                    <h5>
                        Please check your inbox.
                    </h5>
                    <div className="subscript">
                        <p>
                            <a href="/" className='small-links'>Back to login screen</a>
                        </p>
                    </div>
                </>
            }
        </div>
    );
};

export default ForgotPassword;