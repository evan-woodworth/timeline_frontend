// IMPORTS
import React, {useState} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import {Redirect} from 'react-router-dom';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {username, password};
        axios.post(`${REACT_APP_SERVER_URL}/login/`, userData)
        .then(response => {
            const {token} = response.data;
            localStorage.setItem('jwtToken', token);        // Save token to localStorage
            setAuthToken(token);                            // Set token to authentication header
            const decoded = jwt_decode(token);              // Decode token to get the user data
            props.nowCurrentUser(decoded);                  // Set current user
        }).catch(error =>{
            console.log('------------ LOGIN ERROR ------------')
            console.log(error);
            alert('Either username or password is incorrect. Please try again.');
        });
    }

    if (props.user) return <Redirect to='/profile' />

    return (
        <div className="row mt-4">
            <div className="col-md-7 offset-md-3">
                <div className="card card-body">
                    <h2 className="py-2">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" value={username} onChange={handleUsername} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
