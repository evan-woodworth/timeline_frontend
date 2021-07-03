import React, {useState} from 'react';

const DetailUpdate = (props) => {
    const { id, user, title, summary, description, image } = props.entry
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updateSummary, setUpdateSummary] = useState(summary);
    const [updateDescription, setUpdateDescription] = useState(description);
    const [updateImage, setUpdateImage] = useState(image);

    const data = {
        id: id,
        user: user,
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

    const handleImage = (e) => {
        setUpdateImage(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title"> Title </label>
            <input type="text" name="title" value={updateTitle} onChange={handleTitle} />
            
            <label htmlFor="summary"> Summary </label>
            <input type="text" name="summary" value={updateSummary} onChange={handleSummary} />
            
            <button type="submit" className="btn btn-info">Submit</button>
        </form>
    )
}

export default DetailUpdate;