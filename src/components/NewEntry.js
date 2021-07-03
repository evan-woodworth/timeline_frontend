import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;


const NewEntry = (props) => {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
    const user = props.user.user_id
    const timeline = props.timeline.title
    const timelines = props.timeline
    const [title, setTitle] = useState('');
    const [datetime, setDatetime] = useState('');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [rerender, setRerender] = useState(false);

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
        // axios.post(`${REACT_APP_SERVER_URL}/api/entries/`, data, payload)
        axios.post(`${REACT_APP_SERVER_URL}/api/entries/`, data)
        .then(response => {
            console.log(response.data);
            alert('Entry successfully created');
            // setRerender(true);
        }).catch(error => {
            console.log(error);
            alert('Unsuccessful entry creation');
        });
    }

    if (rerender === true) return <Redirect to={{
        pathname:'/timelines', 
        state: {timeline: timelines}
        }}/>


    return (
      <div className="container col-5 card card-body" style={{fontWeight:"600"}}>
      <h5 style={{fontWeight:"800"}}>Add new entry to this timeline</h5>
        <form onSubmit={handleSubmit}>
            {/* <select onChange={handleTimeline}>
                <option value="Batman">Batman</option>
                <option value="Marvel">Marvel</option>
            </select> */}
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input className="form-control" type="text" name="title" value={title} onChange={handleTitle}placeholder="Enter a Timeline Title (max length 50 chars)" />
            </div>
            <div className="form-group">
              <label htmlFor="summary">Summary</label>
              <input className="form-control" type="text" name="summary" value={summary} onChange={handleSummary} placeholder="Enter a summary (max length 100 chars)"/>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea className="form-control" name="description" value={description} onChange={handleDescription}/>
            </div>
            <div className="form-group">
              <label htmlFor="datetime">Datetime</label>
              <input className="form-control" type="date" name="datetime" value={datetime} onChange={handleDatetime}/>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input className="form-control" type="text" name="image" value={image} onChange={handleImage} placeholder="Enter an image URL"/>
            </div>
            <button type="submit" className="btn btn-primary"> Submit </button>
        </form>
        </div>
    )
}

export default NewEntry;