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
  console.log("Show me the props!!!!!!")
  console.log("Inside DetailUpdate page")
  console.log(props)

    return (
        <div className="card card-body mb-3" style={{fontWeight:"600"}}>
        <form onSubmit={e=>props.handleSubmit(e, data)}>
          <div className="form-group">
            <label htmlFor="title"> Title </label>
            <input className="form-control" type="text" name="title" value={updateTitle} onChange={handleTitle} placeholder="Enter a Timeline Title (max length 50 chars)" />
          </div>
          <div className="form-group">
            <label htmlFor="summary"> Summary </label>
            <input className="form-control" type="text" name="summary" value={updateSummary} onChange={handleSummary} placeholder="Enter a summary (max length 100 chars)" />
          </div>
          <div className="form-group">
            <label htmlFor="description"> Description </label>
            <textarea className="form-control" type="text" name="description" value={updateDescription} onChange={handleDescription} />
          </div>
          <div className="form-group">
            <label htmlFor="datetime"> Date </label>
            <input className="form-control" type="date" name="datetime" value={updateDatetime} onChange={handleDatetime} />
          </div>
          <div className="form-group">
            <label htmlFor="image"> Image </label>
            <input className="form-control" type="text" name="image" value={updateImage} onChange={handleImage}  placeholder="Enter an image URL" />
          </div>
            <button type="submit" className="btn btn-info mr-2">Submit</button>
            <button type="button" onClick={e=>props.hideUpdatePage(e)} className="btn btn-warning">Cancel</button>
        </form>
      </div>
    )
}

export default DetailUpdate;