import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


export default function MyTimelines(props) {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
    const { user } = props;
    const [userTimelines, setUserTimelines] = useState([]);
    const [finishedLoading, setFinishedLoading] = useState(false);

    const getUserTimelines = async (userId) => {
        try {
            const userTimelineResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/users/${userId}/`, payload)
            console.log(userTimelineResponse)
            const theTimelines = userTimelineResponse.data.timelines;
            console.log(userTimelineResponse)
            return theTimelines;
        } catch (error) {
            console.log("failed to get user's timeline data", error)
            return [{id:"fail",title:"fail"}];
        }
    }

    const displayUserTimelines = userTimelines.map((timeline, idx)=>(
        <>
            <li className="list-group-item pl-0">
            <Link to={{
                pathname:'/timelines',
                state: {timeline: timeline}
            }} className="timeline-links"> {timeline.title} </Link>
            </li>
        </>
    ))

    useEffect(async ()=>{
        console.log('-----------------------------------------------------------')
        const theTimelines = await getUserTimelines(user.user_id);
        setUserTimelines(theTimelines);
        console.log(theTimelines);
        console.log(user)
        setFinishedLoading(true);
    }, [user])

    if (!finishedLoading) {
        return (<p>...Loading</p>)
    }
    return (
        <div className="container">
            <h2>My Timelines</h2>
            <p style={{fontWeight:"500"}}>{
              displayUserTimelines.length === 0? "No Timelines Found" :  displayUserTimelines.length === 1 ? 
              displayUserTimelines.length + " Timeline" : 
              displayUserTimelines.length + " Timelines"
              }
            </p>

            <div className="col text-left">
              <ul className="list-group list-group-flush">
               {displayUserTimelines}
              </ul>
              
            </div>
        </div>
    )
}