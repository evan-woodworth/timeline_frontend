import React, {useState} from 'react';
import axios from 'axios';
import DetailUpdate from './DetailUpdate';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function DetailShow(props) {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
    const { entry } = props;
    const [updatePage, setUpdatePage] = useState(false);

    const handleUpdate = () => {
        setUpdatePage(!updatePage)
    }

    const handleDelete = (e, entryToDelete) => {
        // axios.delete(`${REACT_APP_SERVER_URL}/api/entries/${entry.id}/`, payload)
        axios.delete(`${REACT_APP_SERVER_URL}/api/entries/${entryToDelete.id}/`)
        .then(response => {
            console.log(response.data);
            alert(`Entry ${entryToDelete.title} deleted`);
        }).catch(error => {
            console.log('------------ ENTRY DELETE ERROR ------------');
            console.log(error);
            alert('Delete unsuccessful. Please try again.');
        })
    };

    return (
            <div className="timeline-modal">
                <div className="timeline-entry-details container">
                    <div className="btn btn-primary float-right" onClick={e=>props.hideDetails(e)}> X </div>
                    <h3>{entry.title}</h3>
                    <h4>{entry.date}</h4>
                    <h5>{entry.subject}</h5>
                    { entry.nestedEntries.length ? (
                        entry.nestedEntries.map((nestEntry,idx)=>(
                            <div key={idx}>
                                <h4>{nestEntry.title}</h4>
                                <h5>{nestEntry.date}</h5>
                                <h6>{nestEntry.subject}</h6>
                                <p>{nestEntry.description}</p>
                                { (updatePage === true) ? (
                                    <div>
                                        <DetailUpdate handleSubmit={props.handleEntryUpdate} entry={nestEntry}/>
                                    </div>
                                    
                                ) : <></> }
                                <div className="btn btn-secondary" onClick={handleUpdate}> Update </div>
                                <div className="btn btn-danger" onClick={e=>handleDelete(e,nestEntry)}> Delete </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <p>{entry.description}</p>
                            { (updatePage === true) ? (
                                <div>
                                    <DetailUpdate handleSubmit={props.handleEntryUpdate} entry={entry}/>
                                </div>
                            ) : <></> }
                            <div className="btn btn-secondary" onClick={handleUpdate}> Update </div>
                            <div className="btn btn-danger" onClick={e=>handleDelete(e,entry)}> Delete </div>
                        </div>
                    )}
            </div>
        </div>
    )
}
