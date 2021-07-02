import React, { useEffect, useState} from 'react'

export default function TimelineShow(props) {
    // const { entries, frame } = props;
    let entries = []
    let frame =['0','1']
    const [activeEntries, setActiveEntries] = useState([]);
    const [finishedLoading, setFinishedLoading] = useState(false);

    useEffect(() => {
        let entryArray = []
        entries.forEach(entry => {
            if ((entry.datetime >= frame[0]) && (entry.datetime <= frame[1])) {
                entryArray.push(entry);
            }
        })
        setActiveEntries(entryArray)
        setFinishedLoading(true)

    }, [])

    if (!finishedLoading) {
        return (<p>...Loading</p>)
    }
    return (
        <div className="timeline">
            <div className="timeline-current-point"></div>
            <div className="timeline-entries">
                { activeEntries.map((entry,i) => (

                    <div key={i} className="timeline-entry-point">
                        <div className="timeline-entry-bottom">
                            {entry.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
