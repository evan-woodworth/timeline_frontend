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
        <div className="col" key={idx}>
            <div className="card card-body">
            <Link to={{
                pathname:'/timelines',
                state: {timeline: timeline}
            }}> {timeline.title} </Link>
            </div>
        </div>
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
            <h2>My Timelines:</h2>
            <div className="row text-center justify-content-around" style={{}}>{displayUserTimelines}</div>
        </div>
    )
}