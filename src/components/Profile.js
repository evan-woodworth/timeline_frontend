import React from 'react';
import {Link} from 'react-router-dom';

const Profile = (props) => {
    const {handleLogout} = props;
    const {user_id, username, email, exp} = props.user;
    const expirationTime = new Date(exp * 1000);
    let currentTime = Date.now();
    // console.log('Time:', String(expirationTime));

    if (currentTime >= expirationTime) {
        handleLogout();
        alert('Session has ended. Please login again.');
    }

    const userData = props.user ? 
    (<div>
        <h1>Profile</h1>
        <p><strong>Username:</strong> { username }</p> 
        <p><strong>Email:</strong> { email }</p> 
        <p><strong>ID:</strong> { user_id }</p>
    </div>) 
    : <h4>...Loading...</h4>

    const errorDiv = () => {
        return (
            <div className="text-center pt-4">
                <h3>Please <Link to="/login">login</Link> to view this page</h3>
            </div>
        );
    };
    
    return (
        <div>
            { props.user ? userData : errorDiv() }
        </div>
    );

}

export default Profile;