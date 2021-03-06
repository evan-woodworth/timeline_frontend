import React, { useEffect, useState, useRef } from 'react';
import DetailShow from './DetailShow';
import NewEntry from './NewEntry';
import TimelineFrameControl from './TimelineFrameControl';

const splitDateTime = (datetime) => {
    let datetimeArray = datetime.split("T");
    let dateArray = datetimeArray[0].split('-');
    let daySync = parseInt(dateArray[0])*365+(30*(parseInt(dateArray[1])-1) + parseInt(dateArray[2]));
    return {'date':datetimeArray[0], 'time':datetimeArray[1], daySync}
}

const wrangleEntries = ( incomingList, cardWidth, width, windowZoom ) => {
    const entryList = [...incomingList];
    let wrangledEntries = [entryList[0]]
    // --entry.linePosition-- represents an entry's position on the timeline, by percentage of the whole.
    // The goal here is to nest entries that are too close to each other.
    // --cardWidth-- represents the pixel width of an entry, while
    // --width-- represents the width of the available window.
    // if --width-- is below a predetermined threshold, the timeline length and card size changes.
    if (window.innerWidth <= 550) {
        width = 2000;
        cardWidth = 250;
    }
    // --wrangleWidth-- represents the calculated boundary to nest an entry, by percentage of the timeline.
    let wrangleWidth = Math.floor(100*(cardWidth/(width*windowZoom)))+3
    for (let i=0; i < entryList.length-1; i++) {
        let checkAgain = true;
        let nestingHappened = false;
        let newEntry = Object.create(entryList[i+1]);
        for ( let j = i+2; j<entryList.length && checkAgain; j++ ) {
            // if entry is too close to the entry on the left on the same side of timeline, nest it
            if ( entryList[j].linePosition - entryList[i].linePosition <= wrangleWidth ) {
                nestingHappened = true;
                // if entry to the left is already a nest, add to nest
                // else, make a nest
                if (newEntry.nestedEntries.length) {
                    newEntry.nestedEntries.push(entryList[j]);
                } else {
                    let nest = [entryList[i+1], entryList[j]];
                    newEntry.nestedEntries = nest;
                    newEntry['image'] = "";
                    newEntry['title'] = "Multiple";
                }
                // update nest's displayed fields
                newEntry['date'] = `${newEntry.nestedEntries[0].date}-${entryList[j].date}`;
                newEntry['summary'] = `${newEntry.nestedEntries.length} entries`;
                if (j === entryList.length-1){
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

const parseEntries = (incomingList, frame, cardWidth, width, windowZoom) => {
    let entryList = [...incomingList]
    let validEntries = [];
    for (let i=0; i<entryList.length; i++) {
        const { date, time, daySync } = splitDateTime(entryList[i].datetime);
        if ((daySync >= frame[0].daySync) && (daySync <= frame[1].daySync)) {
            entryList[i]['date'] = date;
            entryList[i]['time'] = time;
            entryList[i]['daySync'] = daySync;
            entryList[i]['linePosition'] = (100*((daySync-frame[0].daySync)/(frame[1].daySync-frame[0].daySync)));
            entryList[i]['nestedEntries'] = [];
            validEntries.push(entryList[i]);
        }
    }
    // combine close entries
    let wrangledEntries = wrangleEntries(validEntries, cardWidth, width, windowZoom);
    // assign sides of timeline
    for (let i=0; i<wrangledEntries.length; i++) {
        wrangledEntries[i]['position'] = ( i%2 ? 'bottom' : 'top' );
    }
    return wrangledEntries;
}

export default function TimelineShow(props) {
    const { title, frame } = props;
    const cardWidth = 150;
    const timelineHeight = 2000;
    const [displayEntries, setDisplayEntries] = useState([]);
    const [detailCardOpen, setDetailCardOpen] = useState(false);
    const [currentEntry, setcurrentEntry] = useState({});
    const [finishedLoading, setFinishedLoading] = useState(false);
    const [entryPage, setEntryPage] = useState(false);
    const [zoom, setZoom] = useState(1);

    const handleZoom = (e, modifier) => {
        let newZoom = zoom + modifier
        if ( newZoom > 0 && newZoom < 10 ) {
            setZoom(newZoom);
            changeWidth();
        }
    }

    const showDetails = (e,entry) => {
        setcurrentEntry(entry);
        setDetailCardOpen(true);
    }

    const hideDetails = (e) => {
        setDetailCardOpen(false);
    }

    const handleEntryPage = (e) => {
        setEntryPage(!entryPage)
    }

    const changeWidth = () => {
        if (props.entries.length) {
            const theEntries = [...props.entries];
            const currentZoom = localStorage.getItem('currentZoom');
            const parsedEntries = parseEntries(theEntries, frame, cardWidth, window.innerWidth-96, currentZoom);
            setDisplayEntries(parsedEntries);
        }
    }

    const swapDate = (date)=>{
        const splitDate = date.split("-")
        const yearRemoved = splitDate.shift()
        splitDate.push(yearRemoved)
        const newDateFormat = splitDate.join("-")
        return newDateFormat
    }

    useEffect(()=>{
        document.documentElement.style.setProperty('--timeline-zoom', (100*zoom)+'%');
        localStorage.setItem('currentZoom', zoom)
    },[zoom])

    useEffect(()=>{
        if (props.entries.length) {
            const theEntries = [...props.entries];
            const parsedEntries = parseEntries(theEntries, frame, cardWidth, window.innerWidth-96, zoom);
            setDisplayEntries(parsedEntries);
        }
        localStorage.setItem('currentZoom', zoom);
        setFinishedLoading(true);
        window.addEventListener('resize', changeWidth);
        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, [])

    if (!finishedLoading) {
        return (<p>...Loading</p>)
    }
    return (
        <div className="timeline-show">
            { detailCardOpen ? (
                <div style={{position: 'absolute', zIndex: '1', top:"10%"}}>
                    <DetailShow entry={currentEntry} handleEntryUpdate={props.handleEntryUpdate} handleEntryDelete={props.handleEntryDelete} hideDetails={hideDetails} />
                </div>
            ) : (
                <></>
            ) }
            { entryPage ? (
                <div className="timeline-modal" style={{position: 'absolute', zIndex: '1', top:"6%"}}>
                    <NewEntry user={props.user} entry={currentEntry} timeline={props.location.state.timeline} handleEntryPage={props.handleEntryPage} 
                    handleSubmit={props.handleNewEntry} closeEntryPage={handleEntryPage}/>
                </div>
            ) : (
                <></>
            ) }
            <div className="timeline-title">
                <h2>{title}</h2>
                <button className="btn btn-primary" onClick={handleEntryPage}>New Entry</button>
                <TimelineFrameControl zoom={zoom} handleZoom={handleZoom} />
            </div>
            <div className="timeline" style={{'--timeline-height': timelineHeight*zoom+'px'}}>
                <div className="timeline-current-point"></div>
                <div className="timeline-entries">
                    { displayEntries.length ? (
                        displayEntries.map((entry,i) => (
                            <div key={i} className="timeline-entry-point" style={{'--line-position': entry.linePosition+"%"}}>
                                <div className={"timeline-entry-" + (entry.position)}>
                                    <div className="timeline-entry-card" onClick={e=>{showDetails(e, entry)}}>
                                        <h5 className="timeline-entry-date">{swapDate(entry.date)}</h5>
                                        {entry.image.length ? (
                                            <img className="img rounded" src={entry.image} alt={entry.title}/>
                                        ):(
                                            <></>
                                        )}
                                        <h4 className="timeline-entry-title">{entry.title}</h4>
                                        <div className="timeline-entry-summary">{entry.summary}</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <></>
                    ) }
                </div>
            </div>
        </div>
    )
}