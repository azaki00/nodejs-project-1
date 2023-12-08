import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

    const resetPassword = async () => {
        try {
            // Extract the token from the URL
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');

            // Perform password reset API call
            const response = await axios.post('http://yourdomain.com/api/reset-password', {
                token,
                password,
            });

            // Handle success
            setResetSuccess(true);
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    useEffect(() => {
        // Check if the token is present in the URL
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (!token) {
            // Token is not present, handle accordingly (e.g., show an error message)
        }
    }, []);

    return (
        <div>
            {resetSuccess ? (
                <p>Password reset successful! You can now login with your new password.</p>
            ) : (
                <>
                    <div className="login-container">
                        <h2>
                            Resetting Account Password
                        </h2>
                        <div className="form-group">
                            <label>New Password:</label>
                            <input type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control-input"
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="form-control-input"
                            />
                        </div>
                        <button className="submit-btn" onClick={resetPassword}>Reset Password</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default ResetPassword;