import React, { useEffect, useState } from 'react'

const splitDateTime = (datetime) => {
    let datetimeArray = datetime.split("T");
    let dateArray = datetimeArray[0].split('-');
    let daySync = parseInt(dateArray[0])*365+(30*(parseInt(dateArray[1])-1) + parseInt(dateArray[2]));
    return {'date':datetimeArray[0], 'time':datetimeArray[1], daySync}
}

const wrangleEntries = (entryList, place) => {
    // console.log('entering wrangle')
    // console.log(entryList)
    // if ( entryList.length < place+3 ) {
    //     console.log('entrylist length return')
    //     return entryList;
    // }
    // let entryArray = entryList.slice(place, place+3)
    // console.log(entryArray)
    // // if entry is too close to the entry on the left on the same side of timeline, nest it
    // if ( (entryArray[2].linePosition - entryArray[0].linePosition) <= 15 ) {
    //     console.log('nesting')
    //     // if entry to the left is already a nest, add to nest
    //     // else, make a nest
    //     if ( entryArray[1].nestedEntries.length ) {
    //         entryArray[1]['nestedEntries'].push(entryArray[2])
    //         console.log('------------------- nested: true')
    //         console.log(entryArray)
    //     } else {
    //         let nestArray = [ entryArray[1], entryArray[2] ];
    //         entryArray[1]['nestedEntries'] = nestArray;
    //         entryArray[1]['image'] = "";
    //         entryArray[1]['title'] = "Multiple";
    //         console.log('------------------- nested: false')
    //         console.log(entryArray)
    //     }
    //     // update nest's displayed fields
    //     entryArray[1]['date'] = `${entryArray[1]['nestedEntries'][0].date} - ${entryArray[1]['nestedEntries'][entryArray[1]['nestedEntries'].length-1].date}`;
    //     entryArray[1]['summary'] = `${entryArray[1]['nestedEntries'].length} entries`;
    //     // if there are more entries, move it right along, else return
    //     if (entryList.length > place + 2) {
    //         return wrangleEntries(entryList.slice(0, place).concat(entryArray.slice(0,2)).concat(entryList.slice(place+3)), place);
    //     } else {
    //         return entryList.slice(0, place).concat(entryArray.slice(0,2))
    //     }
    // }
    // // move right along
    // console.log('not nesting')
    // return wrangleEntries(entryList, place+1)

    console.log('entering wrangle')
    console.log(entryList)
    let wrangledEntries = [entryList[0]]
    for (let i=0; i < entryList.length-1; i++) {
        let checkAgain = true;
        let nestingHappened = false;
        // wrangledEntries.push(entryList[i])
        console.log(wrangledEntries)
        let newEntry = Object.create(entryList[i+1]);
        for ( let j = i+2; j<entryList.length && checkAgain; j++ ) {
            // if entry is too close to the entry on the left on the same side of timeline, nest it
            if ( entryList[j].linePosition - entryList[i].linePosition <= 15 ) {
                nestingHappened = true;
                console.log('nesting');
                console.log(newEntry)
                // if entry to the left is already a nest, add to nest
                // else, make a nest
                if (newEntry.nestedEntries.length) {
                    newEntry.nestedEntries.push(entryList[j]);
                    console.log('------------ not a new nest')
                    console.log(newEntry.nestedEntries)
                } else {
                    console.log(entryList[i+1]);
                    let nest = [entryList[i+1], entryList[j]];
                    console.log('------------ new nest')
                    console.log(nest)
                    newEntry.nestedEntries = nest;
                    newEntry['image'] = "";
                    newEntry['title'] = "Multiple";
                }
                // update nest's displayed fields
                newEntry['date'] = `${newEntry.nestedEntries[0].date} - ${entryList[j].date}`;
                newEntry['summary'] = `${newEntry.nestedEntries.length} entries`;
                if (j == entryList.length-1){
                    i++;
                }
            } else {
                checkAgain = false;
                if ( nestingHappened ) {
                    i = j-2;
                }
            }
        }
        if ( nestingHappened ) {
            wrangledEntries.push(newEntry);
        } else {
            wrangledEntries.push(entryList[i+1]);
        }
    }
    // check last entry
    if (wrangledEntries[wrangledEntries.length-1]) {}
    return wrangledEntries;
}

const parseEntries = (entryList, frame) => {
    let validEntries = [];
    for (let i=0; i<entryList.length; i++) {
        const { date, time, daySync } = splitDateTime(entryList[i].datetime);
        if ((daySync >= frame[0].daySync) && (daySync <= frame[1].daySync)) {
            entryList[i]['date'] = date;
            entryList[i]['time'] = time;
            entryList[i]['daySync'] = daySync;
            entryList[i]['linePosition'] = Math.floor(100*((daySync-frame[0].daySync)/(frame[1].daySync-frame[0].daySync)));
            entryList[i]['nestedEntries'] = [];
            validEntries.push(entryList[i]);
        }
    }
    console.log('------------------ valid entries -------')
    console.log(validEntries)
    // combine close entries
    let wrangledEntries = wrangleEntries(validEntries, 0);
    console.log(wrangledEntries)
    // assign sides of timeline
    for (let i=0; i<wrangledEntries.length; i++) {
        wrangledEntries[i]['position'] = ( i%2 ? 'bottom' : 'top' );
    }
    console.log(wrangledEntries)
    return wrangledEntries;
}

export default function Test(props) {
    const {title} = props;
    console.log('-------------------------entries---')
    console.log(props.entries)
    const frame = [
        {date:"2021-01-01", time:"14:11:00-05:00", daySync:737666},
        {date:"2021-07-01", time:"14:11:00-05:00", daySync:737846}
    ]
    const [displayEntries, setDisplayEntries] = useState([])
    const [finishedLoading, setFinishedLoading] = useState(false);
    
    console.log('hihihi')

    useEffect(()=>{
        console.log('--------------------------------------------')
        const parsedEntries = parseEntries(props.entries, frame);
        console.log(parsedEntries)
        setDisplayEntries(parsedEntries);
        setFinishedLoading(true);
    }, [])

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
                        <div key={i} className="timeline-entry-point" style={{'--line-position': entry.linePosition+"%"}}>
                            <div className={"timeline-entry-" + (entry.position)}>
                                <div className="timeline-entry-card">
                                <h5 className="timeline-entry-date">{entry.date}</h5>
                                    {entry.image.length ? (
                                        <img src={entry.image} alt={entry.title}/>
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