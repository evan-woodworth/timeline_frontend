import React, {useState} from 'react';
import DetailUpdate from './DetailUpdate';

export default function DetailShow(props) {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
    const { entry } = props;
    const [updatePage, setUpdatePage] = useState(false);

    const handleUpdate = () => {
        setUpdatePage(!updatePage)
    }

    const hideUpdatePage = (e) =>{
        setUpdatePage(false)
    }

    const swapDate = (date)=>{
        const splitDate = date.split("-")
        const yearRemoved = splitDate.shift()
        splitDate.push(yearRemoved)
        const newDateFormat = splitDate.join("-")
        return newDateFormat
    }

    return (
            <div className="timeline-modal">
                <div className="timeline-entry-details container">
                    <div className="btn btn-danger float-right pl-3 pr-3" onClick={e=>props.hideDetails(e)} style={{fontSize:"1.3rem"}}> X </div>
                    <h3>{entry.title}</h3>
                    <h5>{swapDate(entry.date)}</h5>
                    <h5>{entry.subject}</h5>
                    { entry.nestedEntries.length ? (
                        entry.nestedEntries.map((nestEntry,idx)=>(
                            <div key={idx}>
                                <h4>{nestEntry.title}</h4>
                                <h5>{swapDate(nestEntry.date)}</h5>
                                <h6>{nestEntry.subject}</h6>
                                <img src={nestEntry.image}/>
                                <p>{nestEntry.description}</p>
                                { (updatePage === true) ? (
                                    <div>
                                        <DetailUpdate handleSubmit={props.handleEntryUpdate} hideUpdatePage={hideUpdatePage} entry={nestEntry}/>
                                    </div>
                                ) : (
                                    <div>
                                        <button className="btn btn-secondary mr-2" onClick={handleUpdate}> Update </button>
                                        <button className="btn btn-danger" onClick={e=>props.handleEntryDelete(e,nestEntry)}> Delete </button>
                                    </div>
                                )}

                            </div>
                        ))
                    ) : (
                        <div>
                            <img className="timeline-img" src={entry.image}/>
                            <p>{entry.description}</p>
                            { (updatePage === true) ? (
                                <div>
                                    <DetailUpdate handleSubmit={props.handleEntryUpdate} hideUpdatePage={hideUpdatePage} entry={entry}/>
                                </div>
                            ) : (
                                <div>
                                    <button className="btn btn-secondary mr-2" onClick={handleUpdate}> Update </button>
                                    <button className="btn btn-danger" onClick={e=>props.handleEntryDelete(e,entry)}> Delete </button>
                                </div>
                            )}

                        </div>
                    )}
            </div>
        </div>
    )
}
