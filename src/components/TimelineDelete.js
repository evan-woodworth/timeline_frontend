import React, {useState} from 'react';

const TimelineDelete = (props) => {
    const {id, title} = props.timeline;
    const {username} = props.user;
    const [userInput, setUserInput] = useState('');

    const handleUserInput = (e) => {
        setUserInput(e.target.value)
    }

    return (
        <div className="container timeline-new-form">
          <div className="btn btn-primary float-right pl-3 pr-3" onClick={e=>props.handleDeletePage(e)}> X </div>
            <h4>Are you absolutely sure you want to delete <em>{title}</em> Timeline?</h4>
            <form>
            <div className="form-group">
                <p>This action <strong>cannot</strong> be undone. This will permenantly destroy the {title} Timeline along
                   with all the entries, planets, and inhabitants within this universe associated with it.</p>
                <p>Please type <strong>{username}/{title}</strong> to confirm.</p>
                <input className="form-control" type="text" name="user-input" value={userInput} onChange={handleUserInput}/>
            </div>
            { (userInput === username+'/'+title) ?
              <button type="submit" className="timeline-delete btn btn-danger" onClick={e=>props.handleDeleteTimeline(e, id)}> I understand the consequences and wish to destroy this timeline. </button> 
            : <button className="timeline-delete btn btn-danger" disabled> I understand the consequences and wish to destroy this timeline. </button> }  
            </form>
        </div>
    )
}

export default TimelineDelete;