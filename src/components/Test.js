import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

export default function Test() {
    let entries = [
        {
            title: 'Entry 1',
            "timeline": "Test Timeline",
            summary: 'Some Stuff',
            datetime: "2021-01-01T14:11:00-05:00",
            image: "https://i.imgur.com/60IQydY.jpeg"
        },
        {
            title: 'Entry 2',
            summary: 'Some Other Stuff',
            datetime: "2021-03-01T14:11:00-05:00",
            image: ""
        },
        {
            title: 'Entry 3',
            summary: 'Some More Stuff',
            datetime: "2021-04-01T14:11:00-05:00",
            image: "https://i.imgur.com/KXcLOHo.jpeg"
        },
        {
            title: 'Entry 4',
            summary: 'Some Sort of Stuff',
            datetime: "2021-07-01T14:11:00-05:00",
            image: ""
        },
    ]
    const frame = [
        {date:"2021-01-01", time:"14:11:00-05:00", daySync:737666},
        {date:"2021-07-01", time:"14:11:00-05:00", daySync:737846}
    ]
    const [title, setTitle] = useState('');
    const [displayEntries, setDisplayEntries] = useState([])
    const [finishedLoading, setFinishedLoading] = useState(false);
    
    const splitDateTime = (datetime) => {
        let datetimeArray = datetime.split("T");
        let dateArray = datetimeArray[0].split('-');
        let daySync = parseInt(dateArray[0])*365+(30*(parseInt(dateArray[1])-1) + parseInt(dateArray[2]));
        return {'date':datetimeArray[0], 'time':datetimeArray[1], daySync}
    }

    const parseEntries = (entryList) => {
        let entryArray = [];
        for (let i=0; i<entryList.length; i++) {
            const { date, time, daySync } = splitDateTime(entryList[i].datetime);
            if ((daySync >= frame[0].daySync) && (daySync <= frame[1].daySync)) {
                entryList[i]['date'] = date;
                entryList[i]['time'] = time;
                entryList[i]['daySync'] = daySync;
                entryList[i]['linePosition'] = `${Math.floor(100*((daySync-frame[0].daySync)/(frame[1].daySync-frame[0].daySync)))}%`;
                entryList[i]['position'] = ( i%2 ? 'bottom' : 'top' )
                entryArray.push(entryList[i]);
            }
        }

        console.log(entryArray)
        return entryArray;
    }

    useEffect(()=>{
        let entryArray = parseEntries(entries);
        let theTitle = entries[0].timeline;
        setTitle(theTitle)
        setDisplayEntries(entryArray);
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
                        <div key={i} className="timeline-entry-point" style={{'--line-position': entry.linePosition}}>
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