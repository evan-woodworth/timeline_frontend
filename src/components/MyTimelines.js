import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import NewTimeline from './NewTimeline';
import TimelineDelete from './TimelineDelete';
import TimelineUpdate from './TimelineUpdate';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


export default function MyTimelines(props) {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
    const { user } = props;
    const [userTimelines, setUserTimelines] = useState([]);
    const [finishedLoading, setFinishedLoading] = useState(false);
    const [newTimeline, setNewTimeline] = useState(false);
    const [timelineChange, setTimelineChange] = useState(false);
    const [deletePage, setDeletePage] = useState(false);
    const [deleteTimeline, setDeleteTimeline] = useState('');
    const [updatePage, setUpdatePage] = useState(false);
    const [updateTimeline, setUpdateTimeline] = useState('');

    const getUserTimelines = async (userId) => {
        try {
            const userTimelineResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/users/${userId}/`, payload)
            // console.log(userTimelineResponse)
            const theTimelines = userTimelineResponse.data.timelines;
            // console.log(userTimelineResponse)
            return theTimelines;
        } catch (error) {
            console.log("failed to get user's timeline data", error)
            return [{id:"fail",title:"Failed to retrieve timeline data..."}];
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

    const handleDeleteTimeline = (e, id) => {
        axios.delete(`${REACT_APP_SERVER_URL}/api/timelines/${id}/`)
        .then(() => {
            setTimelineChange(!timelineChange)
        }).catch(error => {
            console.log(error);
            alert('Unable to delete timeline. Please try again.');
        });
    }

    const handleUpdateTimeline = (e, data) => {
        axios.put(`${REACT_APP_SERVER_URL}/api/timelines/${data.id}/`, data)
        .then(() => {
            setTimelineChange(!timelineChange)
        }).catch(error => {
            console.log(error);
            alert('Unable to update timeline. Please try again.')
        })
    }

    const handleDeletePage = (e, timeline) => {
        setDeleteTimeline(timeline);
        setDeletePage(!deletePage);
    }

    const handleUpdatePage = (e, timeline) => {
        setUpdateTimeline(timeline)
        setUpdatePage(!updatePage);
    }

    const displayUserTimelines = userTimelines.map((timeline, idx)=>(
            <li className="list-group-item pl-0 pr-0 mytimelines-list__text" key={idx}>
                {timeline.id == 'fail' ? (
                    <p>{timeline.title}</p>
                ) : (
                    <div className="mytimelines-list-container">
                        <div class="mytimelines-list-container__text">
                        <Link to={{
                            pathname:'/timelines',
                            state: {timeline: timeline}
                        }} className="timeline-links"> {timeline.title} </Link>
                        </div>
                        
                        <div className="mytimelines-button__container">
                        <button className="btn btn-secondary  mr-3" onClick={e=>handleUpdatePage(e, timeline)} > Update </button>
                        <button className="btn btn-danger " onClick={e=>handleDeletePage(e, timeline)}> Delete </button>
                        
                        </div>
                        
                    </div>
                )}
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
            <div className="text-left mytimelines-container">
                <ul className="list-group list-group-flush">
                    {displayUserTimelines}
                </ul>
            </div>
            { (newTimeline === true) ? 
            <div className="timeline-modal">
                <NewTimeline user={props.user} handleNewTimeline={handleNewTimeline} handleTimelineSubmit={handleTimelineSubmit}/>
            </div> 
            : <></>}
            { (updatePage === true) ? 
            <div className="timeline-modal">
                <TimelineUpdate user={props.user} timeline={updateTimeline} handleUpdatePage={handleUpdatePage} handleUpdateTimeline={handleUpdateTimeline}/>
            </div> 
            : <></> }
            { (deletePage === true) ? 
            <div className="timeline-modal">
                <TimelineDelete user={props.user} timeline={deleteTimeline} handleDeleteTimeline={handleDeleteTimeline} handleDeletePage={handleDeletePage}/>
            </div>
            : <></>}
        </div>
    )
}