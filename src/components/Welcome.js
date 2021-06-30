import React from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Welcome = (props) => {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}

    const handleUserData = (e) => {
        axios.get(`${REACT_APP_SERVER_URL}/api/users/`, payload)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
            alert('Please login to view data.')
        });
    };

    const handleEntries = (e) => {
        axios.get(`${REACT_APP_SERVER_URL}/api/entries`, payload)
        .then(response => {
            console.log(response.data);
        }).catch(error => console.log(error))
    }

    return (
        <div>
            <h1>Welcome</h1>
            { props.user ? (
            <div>
                <button className="btn btn-primary" onClick={handleUserData}> Users Data </button>
                <button className="btn btn-secondary" style={{ margin: '10px' }} onClick={handleEntries}> Entries </button>
            </div>
            ) :
            <></>
            }
        </div>
    )
}

export default Welcome;