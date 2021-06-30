// Imports
import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    
    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = e => {
        setPassword(e.target.value);
    }

    const handleConfirmPassword = e => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check to make sure passwords match
        if (password === confirmPassword && password.length >= 8) {
            const payload = { username, email, password };
            let url = `${REACT_APP_SERVER_URL}/signup/`;
            axios.post(url, payload)
            .then(response => {
                console.log(response.data);
                const { token } = response.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token)
                const decoded = jwt_decode(token);  // Decode token to get the user data
                props.nowCurrentUser(decoded);      // Set current user
                setRedirect(true);
            }).catch(error => {
                console.log(error);
                alert('Either email already exist or an error occured on our end. Please try again...');
            })
        } else {
            if (!password === confirmPassword) {
                alert('Passwords do not match. Please try again...');
            } else {
                alert('Password needs to be at least 8 characters. Please try again...');
            }
        }
    }

    if (redirect) return <Redirect to='/profile' />
    
    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" value={username} onChange={handleUsername} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Verify Password</label>
                            <input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;