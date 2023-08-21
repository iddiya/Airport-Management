import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

function LoginPage({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        axios.post('/login', {
            username,
            password
        }).then(res => {
            if (res.data.success) {
                onLoginSuccess();
            } else {
                setErrorMessage(res.data.message || 'Login failed');
            }
        }).catch(err => {
            console.log(err); // log the error to the console
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setErrorMessage(err.response.data.message || `An error occurred: ${err.response.status}`);
            } else if (err.request) {
                // The request was made but no response was received
                setErrorMessage('No response from server');
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrorMessage(err.message);
            }
        });
    }

    return (
        <>
    <div className="login-container">
        <div className="login-form">
            <form onSubmit={handleLogin}>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Username:</label></td>
                            <td><input type="text" value={username} onChange={event => setUsername(event.target.value)} className="login-input" /></td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input type="password" value={password} onChange={event => setPassword(event.target.value)} className="login-input" /></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
            {errorMessage && <p>{errorMessage}</p>}
        </>
    );
}

export default LoginPage;
