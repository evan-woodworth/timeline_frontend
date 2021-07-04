import React, {useState} from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL


const DetailUpdate = (props) => {
    console.log(props)
    const { id, user, timeline, categories, datetime, title, summary, description, image, time } = props.entry
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateSummary, setUpdateSummary] = useState(summary);
    const [updateDescription, setUpdateDescription] = useState(description);
    const [updateDatetime, setUpdateDatetime] = useState(datetime);
    const [updateImage, setUpdateImage] = useState(image);

    const data = {
        id: id,
        user: user,
        timeline: timeline,
        categories: categories,
        datetime: `${updateDatetime}T${time}`,
        title: updateTitle,
        summary: updateSummary,
        description: updateDescription,
        image: updateImage
    }

    const handleTitle = (e) => {
        setUpdateTitle(e.target.value);
    }

    const handleSummary = (e) => {
        setUpdateSummary(e.target.value);
    }

    const handleDescription = (e) => {
        setUpdateDescription(e.target.value);
    }

    const handleDatetime = (e) => {
        setUpdateDatetime(e.target.value);
    }

    const handleImage = (e) => {
        setUpdateImage(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
        axios.put(`${REACT_APP_SERVER_URL}/api/entries/${id}/`, data)
        .then(response => {
            console.log(response.data);
            alert(`Entry ${title} updated`);
        }).catch(error => {
            console.log('--------- ENTRY UPDATE ERROR ---------')
            console.log(error);
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title"> Title </label>
            <input type="text" name="title" value={updateTitle} onChange={handleTitle} />
            <br/>
            <label htmlFor="summary"> Summary </label>
            <input type="text" name="summary" value={updateSummary} onChange={handleSummary} />
            <br/>
            <label htmlFor="description"> Description </label>
            <input type="text" name="description" value={updateDescription} onChange={handleDescription} />
            <br/>
            <label htmlFor="datetime"> Date </label>
            <input type="date" name="datetime" value={updateDatetime} onChange={handleDatetime} />
            <br/>
            <label htmlFor="image"> Image </label>
            <input type="text" name="image" value={updateImage} onChange={handleImage} />
            <br/>
            <button type="submit" className="btn btn-info">Submit</button>
        </form>
    )
}

export default DetailUpdate;