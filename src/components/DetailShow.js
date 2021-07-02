import React from 'react'

export default function DetailShow(props) {
    const { entry } = props;

    return (
        <div className="timeline-entry-details">
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
        </div>
    )
}
