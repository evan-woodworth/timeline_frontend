import React from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Welcome = (props) => {    
    const handleData = (e) => {
        axios.get(`${REACT_APP_SERVER_URL}/api/users/`)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
            alert('Please login to view data.')
        });
    };

    return (
        <div>
            <h1>Welcome</h1>
            { props.user ? 
            <button className="btn btn-primary" onClick={handleData}> Users Data </button>
            :
            <></>
            }
        </div>
    )
}

export default Welcome;