import React, {useState} from 'react';

const DetailUpdate = (props) => {
    const { id, user, timeline, categories, title, summary, description, image, time, date } = props.entry
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateSummary, setUpdateSummary] = useState(summary);
    const [updateDescription, setUpdateDescription] = useState(description);
    const [updateDatetime, setUpdateDatetime] = useState(date);
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

    return (
        <form onSubmit={e=>props.handleSubmit(e, data)}>
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