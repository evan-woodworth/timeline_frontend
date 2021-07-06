import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Welcome = (props) => {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}

  


    // const handleUserData = (e) => {
    //     axios.get(`${REACT_APP_SERVER_URL}/api/users/`, payload)
    //     .then(response => {
    //         console.log(response.data);
      
    //     }).catch(error => {
    //         console.log(error);
    //         alert('Please login to view data.')
    //     });
    // };

    // const handleEntries = (e) => {
    //     axios.get(`${REACT_APP_SERVER_URL}/api/entries`, payload)
    //     .then(response => {
    //         console.log(response.data);
    //     }).catch(error => console.log(error))
    // }
    // console.log(publicTimelines)



    return (
      <>
      <header /> 
        <div className="container">
          <div className="header-tagline__container">
            <h1 className="header-tagline">Make learning fun </h1>
            <p className="h5">Create easy to read timelines of your favorite subjects</p>
            <Link to="/login"><button className="btn btn-primary mt-1">Get Started</button></Link>
          </div>

          <div className="container featured-timeline__container">
            <div className="row"><h3 className="mb-4" style={{fontWeight:"700"}}>Featured Timelines</h3></div>
            
              <div className=" row" >
                <h4>Screenshot will go here</h4>
              </div>
          </div>
        </div>
      </>
    )
}

export default Welcome;