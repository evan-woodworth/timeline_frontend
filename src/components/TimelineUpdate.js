import React, {useState} from 'react';

const TimelineUpdate = (props) => {
    const {user_id} = props.user;
    const {id, title} = props.timeline;
    let privacy = props.timeline.private
    const [updateTitle, setUpdateTitle] = useState(title);
    const [updatePrivacy, setUpdatePrivacy] = useState(privacy)

    const handleTitle = (e) => {
        setUpdateTitle(e.target.value)
    }

    const handlePrivacy = (e) => {
        if (e.target.checked === true) {
            setUpdatePrivacy(true);
        }
        if (e.target.checked === false) {
            setUpdatePrivacy(false);
        }
    }

    const data = {
        id: id,
        user: user_id,
        title: updateTitle,
        private: updatePrivacy,
        entries: []
    }

    return (
        <div className="container timeline-new-form">
        <div className="btn btn-primary float-right pl-3 pr-3" onClick={e=>props.handleUpdatePage(e)}> X </div>
        <h5 style={{fontWeight:"800"}}>Update Timeline</h5>
            <form onSubmit={e=>props.handleUpdateTimeline(e, data)}>
            <div className="form-group">
                <label htmlFor="title"> Title </label>
                <input className="form-control" type="text" name="title" value={updateTitle} onChange={handleTitle} />
            </div>
            <div className="form-group">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="privacy" value={updatePrivacy} checked={updatePrivacy} onChange={handlePrivacy} />
                    <label htmlFor="privacy" className="form-check-label" style={{fontWeight:"600"}}> Make Timeline Private? </label>
                </div>
            </div>
                <button type="submit" className="btn btn-primary mr-2"> Submit </button>
                <button className="btn btn-secondary" onClick={e=>props.handleUpdatePage(e)}> Cancel </button>
            </form>
      </div>
    )
}

export default TimelineUpdate;