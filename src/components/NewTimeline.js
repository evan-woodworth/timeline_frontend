import React, {useState} from 'react';

const NewTimeline = (props) => {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
    const [title, setTitle] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleIsPrivate = (e) => {
        if (e.target.checked === true) {
            setIsPrivate(true);
        }
        if (e.target.checked === false) {
            setIsPrivate(false);
        }
    }

    const data = {
        user: `${props.user.user_id}`,
        title: title,
        private: isPrivate
    }

    return (
        <div className="container timeline-new-form">
          <div className="btn btn-danger float-right pl-3 pr-3" onClick={e=>props.handleNewTimeline(e)} style={{display:"block"}}> X </div>
            <h2>Create a Timeline</h2>
            
            <form onSubmit={e=>props.handleTimelineSubmit(e, data)}>
            <div className="form-group">
                <label htmlFor="title" style={{fontWeight:"600"}}>Title</label>
                <input className="form-control" type="text" name="title" value={title} maxLength="50" onChange={handleTitle} placeholder="Enter a Timeline Title (max length 50 chars)"/>
            </div>
            <div className="form-group">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="private" value={isPrivate} onChange={handleIsPrivate} />
                    <label htmlFor="private" className="form-check-label" style={{fontWeight:"600"}}>Make Timeline Private?
                    </label>
                </div>
            </div>
                <button type="submit" className="btn btn-primary ">Submit</button>     
            </form>
        </div>
    )
}

export default NewTimeline
