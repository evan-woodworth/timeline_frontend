import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export default function Test() {
    let activeEntries = [
        {
            title: 'Entry 1', position: 'bottom',
            summary: 'Some Stuff',
            datetime: "2021-01-01T14:11:00-05:00",
            image: "https://i.imgur.com/60IQydY.jpeg"
        },
        {
            title: 'Entry 2', position: 'top',
            summary: 'Some Other Stuff',
            datetime: "2021-03-01T14:11:00-05:00",
            image: ""
        },
        {
            title: 'Entry 3', position: 'top',
            summary: 'Some More Stuff',
            datetime: "2021-04-01T14:11:00-05:00",
            image: "https://i.imgur.com/KXcLOHo.jpeg"
        },
        {
            title: 'Entry 4', position: 'bottom',
            summary: 'Some Sort of Stuff',
            datetime: "2021-07-01T14:11:00-05:00",
            image: ""
        },
    ]
    const frame = ['2021-01-01T14:11:00-05:00','2021-07-01T14:11:00-05:00']
    const [title, setTitle] = useState('');
    const [displayEntries, setDisplayEntries] = useState([])
    const [finishedLoading, setFinishedLoading] = useState(false);
    
    const splitDateTime = (datetime) => {
        let datetimeArray = datetime.split("T");
        let dateArray = datetimeArray[0].split('-');
        let daySync = parseInt(dateArray[0])*(30*(parseInt(dateArray[1])-1) + parseInt(dateArray[2]));
        return {'date':datetimeArray[0], 'time':datetimeArray[1], daySync}
    }

    const parseEntries = (entryList) => {
        let entryArray = []

    }

    useEffect(()=>{
        activeEntries.forEach(entry => {
            const { date, time, daySync } = splitDateTime(entry.datetime);
            entry['date'] = date;
            entry['time'] = time;
            entry['daySync'] = daySync;
        })
        let theTitle = activeEntries[0].timeline;
        setTitle(theTitle)
        setDisplayEntries(activeEntries);
        setFinishedLoading(true);
    },[])

    if (!finishedLoading) {
        return (<p>...Loading</p>)
    }
    return (
        <div className="TimelineShow">
            <div className="timeline-title">{title}</div>
            <div className="timeline">
                <div className="timeline-current-point"></div>
                <div className="timeline-entries">
                    { displayEntries.map((entry,i) => (
                        <div key={i} className="timeline-entry-point">
                            <div className={"timeline-entry-" + (entry.position)}>
                                <div className="timeline-entry-card">
                                <h5 className="timeline-entry-date">{entry.date}</h5>
                                    {entry.image.length ? (
                                        <img src={entry.image}/>
                                    ):(
                                        <></>
                                    )}
                                    <h4 className="timeline-entry-title">{entry.title}</h4>
                                    <div className="timeline-entry-summary">{entry.summary}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}
ReactDOM.render(<Test />, document.getElementById('root'))