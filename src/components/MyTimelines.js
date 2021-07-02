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
            return [];
        }
    }

    const displayUserTimelines = userTimelines.map((timeline, idx)=>(
        <Link to={{
            pathname:'/timelines',
            timeline: timeline
        }} key={idx}> {timeline.title} </Link>
    ))

    useEffect(async ()=>{
        console.log('-----------------------------------------------------------')
        const theTimelines = await getUserTimelines(user.user_id);
        setUserTimelines(theTimelines);
        console.log(theTimelines);
        console.log(user)
        setFinishedLoading(true);
    },[])

    if (!finishedLoading) {
        return (<p>...Loading</p>)
    }
    return (
        <div>
            {displayUserTimelines}
        </div>
    )
}