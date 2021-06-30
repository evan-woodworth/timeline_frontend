import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TimelineShow from './TimelineShow';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function TimelineContainer(props) {
    // const { timelineIds } = props
    const timelineIds = ['1'] // hard coded for test purposes
    const [timelines, setTimelines] = useState([]);
    const [frame, setFrame] = useState([]);
    const [finishedLoading, setFinishedLoading] = useState(false);

    const sortEntries = (entryArray) => {
        if ( entryArray.length <= 1 ) {
            return entryArray;
        } else {
            let left = [];
            let right = [];
            let returnArray = [];
            let pivot = entryArray.pop();

            for (let i=0; i<entryArray.length; i++) {
                if (entryArray[i].datetime <= pivot.datetime) {
                    left.push(entryArray[i])
                } else {
                    right.push(entryArray[i])
                }
            }

            return (returnArray.concat(sortEntries(left), pivot, sortEntries(right)));
        }
    }

    const splitDateTime = (datetime) => {
        let datetimeArray = datetime.split("T");
        return {'date':datetimeArray[0], 'time':datetimeArray[1]}
    }

    const getTimelineData = async (timelineId) => {
        try {
            const timelineResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/timelines/${timelineId}`);
            let entryArray = sortEntries(timelineResponse.data.entries);
            entryArray.forEach(entry => {
                const { date, time } = splitDateTime(entry.datetime);
                entry['date'] = date;
                entry['time'] = time;
            })
            return entryArray;
        } catch (error) {
            console.log('failed to get timeline data',error)
            return [];
        }
    }

    useEffect( async () => {
        let timelineArray = [];

        for await (const id of timelineIds) {
            const entryArray = await getTimelineData(id);
            timelineArray.push(entryArray);
        }
        
        setTimelines(timelineArray);
        let start = timelineArray[0][0].datetime;
        let end = timelineArray[0][timelineArray[0].length-1].datetime
        timelineArray.forEach(timeline => {
            if (timeline[0].datetime < start) start = timeline[0].datetime;
            if (timeline[timeline.length-1].datetime > end) end = timeline[0].datetime;
        })
        setFrame([start, end]);
        console.log(timelines);
        console.log(frame);
        setFinishedLoading(true);
    }, [])

    if (!finishedLoading) {
        return (<p>...Loading</p>)
    }
    return (
        <div className="timeline-container">
            <div className="timeline-details"></div>
            <div className="timeline-display">
                {timelines.map((timeline, idx) => (
                    <TimelineShow key={idx} entries={timeline} frame={frame} />
                ))}
            </div>
            <div className="timeline-controls" ></div>
        </div>
    )
}