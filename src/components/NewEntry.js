import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const NewEntry = (props) => {
    console.log(props);
    // const [timeline, setTimeline] = useState(`${props.}`);
    // const [timeline, setTimeline] = useState(`${props.timeline.title}`);
    const user = props.user.user_id
    const timeline = props.timeline.title
    const [title, setTitle] = useState('');
    const [datetime, setDatetime] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [rerender, setRerender] = useState(false);

    // const handleTimeline = (e) => {
    //     setTimeline(e.target.value);
    // }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleDatetime = (e) => {
        setDatetime(e.target.value);
    }

    const handleSummary = (e) => {
        setSummary(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleImage = (e) => {
        setImage(e.target.value);
    }

    const data = {
        user: user,
        timeline: timeline,
        title: title,
        datetime: `${datetime}T00:00:00-05:00`,
        summary: summary,
        description: description,
        image: image
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        axios.post(`${REACT_APP_SERVER_URL}/api/entries/`, data)
        .then(response => {
            console.log(response.data);
            setRerender(true);
        }).catch(error => {
            console.log(error);
            alert('Unsuccessful entry creation');
        });
    }

    if (rerender === true) return <Redirect to='/timelines' />


    return (
        <form onSubmit={handleSubmit}>
            {/* <select onChange={handleTimeline}>
                <option value="Batman">Batman</option>
                <option value="Marvel">Marvel</option>
            </select> */}
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={title} onChange={handleTitle}/>
            <br/>
            <label htmlFor="summary">Summary</label>
            <input type="text" name="summary" value={summary} onChange={handleSummary}/>
            <br/>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={description} onChange={handleDescription}/>
            <br/>
            <label htmlFor="datetime">Datetime</label>
            <input type="date" name="datetime" value={datetime} onChange={handleDatetime}/>
            <br/>
            <label htmlFor="image">Image</label>
            <input type="text" name="image" value={image} onChange={handleImage}/>
            <br/>
            <button type="submit" className="btn btn-primary"> Submit </button>
        </form>
    )
}

export default NewEntry;