import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Welcome = (props) => {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}

    const filteredTimeline = () => {
      axios.get(`${REACT_APP_SERVER_URL}/api/public_timelines`)
      .then(response => {
        console.log(response.data)
        console.log('Only Public Timelines')
      }).catch(error => {
        console.log(error)
      })
    }
  
    const allTimeline = () => {
      axios.get(`${REACT_APP_SERVER_URL}/api/timelines`)
      .then(response => {
        console.log(response.data)
        console.log('All Timelines')
      }).catch(error => {
        console.log(error)
      })
    }


    return (
      <>
      <header /> 
        <div className="container">
          <div className="header-tagline__container">
            <h1 className="header-tagline">Make learning fun </h1>
            <p className="h5 header-tagline-paragraph">Create easy to read timelines of your favorite subjects</p>
            <Link to="/login"><button className="btn btn-primary mt-1">Get Started</button></Link>
            <button onClick={filteredTimeline} className="btn btn-primary mt-1" style={{marginLeft:'10px'}}>Timeline Filter</button>
            <button onClick={allTimeline} className="btn btn-primary mt-1" style={{marginLeft:'10px'}}>All Timelines</button>
          </div>

          <div className="containerfeatured-timeline__container">
          <div className="row"><h3 className="mb-4" style={{fontWeight:"700"}}>Featured Timeline</h3></div>
            <div className="">
              <img className="featured-img" src="/img/MCU-Timeline_MD.png" alt="Featured Timeline"></img>
            </div>
          </div>
        </div>
      </>
    )
}

export default Welcome;