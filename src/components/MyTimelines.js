import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import NewTimeline from './NewTimeline';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


export default function MyTimelines(props) {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
    const { user } = props;
    const [userTimelines, setUserTimelines] = useState([]);
    const [finishedLoading, setFinishedLoading] = useState(false);
    const [newTimeline, setNewTimeline] = useState(false);
    const [timelineChange, setTimelineChange] = useState(false);

    const getUserTimelines = async (userId) => {
        try {
            const userTimelineResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/users/${userId}/`, payload)
            // console.log(userTimelineResponse)
            const theTimelines = userTimelineResponse.data.timelines;
            // console.log(userTimelineResponse)
            return theTimelines;
        } catch (error) {
            console.log("failed to get user's timeline data", error)
            return [{id:"fail",title:"fail"}];
        }
    }
  
    useEffect(async ()=>{
        // console.log('-----------------------------------------------------------')
        const theTimelines = await getUserTimelines(user.user_id);
        setUserTimelines(theTimelines);
        // console.log(theTimelines);
        // console.log(user)
        setFinishedLoading(true);
    }, [user, timelineChange])

    const handleNewTimeline = (e) => {
        setNewTimeline(!newTimeline);
    }

    const handleTimelineSubmit = (e, data) => {
        // axios.post(`${REACT_APP_SERVER_URL}/api/timelines/`, data, payload)
        axios.post(`${REACT_APP_SERVER_URL}/api/timelines/`, data)
        .then(() => {
            setTimelineChange(!timelineChange)
        }).catch(error => {
            console.log(error);
            alert('Unable to create timeline. Please try again.');
        });
    }

    const handleDeleteTimeline = (e, timeline) => {
        axios.delete(`${REACT_APP_SERVER_URL}/api/timelines/${timeline.id}`)
        .then(() => {
            setTimelineChange(!timelineChange)
        }).catch(error => {
            console.log(error);
            alert('Unable to delete timeline. Please try again.');
        });
    }

    const displayUserTimelines = userTimelines.map((timeline, idx)=>(
            <li className="list-group-item pl-0" key={idx}>
            <Link to={{
                pathname:'/timelines',
                state: {timeline: timeline}
            }} className="timeline-links"> {timeline.title} </Link>
            <button className="btn btn-danger float-right" onClick={e=>handleDeleteTimeline(e, timeline)}>Delete</button>
            </li>
    ))

    if (!finishedLoading) {
        return (<p>...Loading</p>)
    }
    return (
        <div className="container">
            <h2>My Timelines</h2>
            <button className="btn btn-primary mb-3" onClick={handleNewTimeline}>Create a timeline</button>
            <p style={{fontWeight:"500"}}>{
              displayUserTimelines.length === 0? `No timelines found`:  displayUserTimelines.length === 1 ? 
              displayUserTimelines.length + " Timeline" : 
              displayUserTimelines.length + " Timelines"
              }
            </p>
            <div className="col text-left">
              <ul className="list-group list-group-flush col-7">
               {displayUserTimelines}
              </ul>
            </div>
            { (newTimeline === true) ? 
            <div className="timeline-modal">
                <NewTimeline user={props.user} handleNewTimeline={handleNewTimeline} handleTimelineSubmit={handleTimelineSubmit}/>
            </div> 
            : <></>}
        </div>
    )
}