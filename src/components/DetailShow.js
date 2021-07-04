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

    const handleDelete = () => {
        // axios.delete(`${REACT_APP_SERVER_URL}/api/entries/${entry.id}/`, payload)
        axios.delete(`${REACT_APP_SERVER_URL}/api/entries/${entry.id}/`)
        .then(response => {
            console.log(response.data);
            alert(`Entry ${entry.title} deleted`);
        }).catch(error => {
            console.log('------------ ENTRY DELETE ERROR ------------');
            console.log(error);
            alert('Delete unsuccessful. Please try again.');
        })
    };

    return (
      <div className="timeline-modal">
        <div className="timeline-entry-details container">
            <div className="btn btn-primary" onClick={e=>props.hideDetails(e)}> X </div>
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
                    </div>
                ))
            ) : (
                <p>{entry.description}</p>
            ) }
            <button className="btn btn-secondary mr-3" onClick={handleUpdate}> Update </button>
            <button className="btn btn-danger" onClick={handleDelete}> Delete </button>
            { (updatePage === true) ? (
                <div>
                    <DetailUpdate entry={props.entry}/>
                </div>
            ) : <></> }
        </div>
      </div>
    )
}
