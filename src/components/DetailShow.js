import React, {useState} from 'react';
import DetailUpdate from './DetailUpdate';

export default function DetailShow(props) {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
    const { entry } = props;
    const [updatePage, setUpdatePage] = useState(false);

    const handleUpdate = () => {
        setUpdatePage(!updatePage)
    }

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
                                <img src={nestEntry.image}/>
                                <p>{nestEntry.description}</p>
                                { (updatePage === true) ? (
                                    <div>
                                        <DetailUpdate handleSubmit={props.handleEntryUpdate} entry={nestEntry}/>
                                    </div>
                                    
                                ) : <></> }
                                <div className="btn btn-secondary" onClick={handleUpdate}> Update </div>
                                <div className="btn btn-danger" onClick={e=>props.handleEntryDelete(e,nestEntry)}> Delete </div>
                            </div>
                        ))
                    ) : (
                        <div>
                            <img src={entry.image}/>
                            <p>{entry.description}</p>
                            { (updatePage === true) ? (
                                <div>
                                    <DetailUpdate handleSubmit={props.handleEntryUpdate} entry={entry}/>
                                </div>
                            ) : <></> }
                            <div className="btn btn-secondary" onClick={handleUpdate}> Update </div>
                            <div className="btn btn-danger" onClick={e=>props.handleEntryDelete(e,entry)}> Delete </div>
                        </div>
                    )}
            </div>
        </div>
    )
}
