import React, { useEffect, useState} from 'react';
import axios from 'axios';
import TimelineShow from './TimelineShow';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function TimelineContainer(props) {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
    // const { timelineIds } = props // for stretch-goal of showing multiple timelines
    const timelineId = props.location.state.timeline.id;
    const timelineIds = [timelineId] 
    const [timelines, setTimelines] = useState([]);
    const [frame, setFrame] = useState([]);
    const [bigFrame, setBigFrame] = useState([]);
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
        let dateArray = datetimeArray[0].split('-');
        let daySync = parseInt(dateArray[0])*365+(30*(parseInt(dateArray[1])-1) + parseInt(dateArray[2]));
        return {'date':datetimeArray[0], 'time':datetimeArray[1], daySync}
    }

    const getTimelineData = async (timelineId) => {
        try {
            // console.log(timelineId)
            const timelineResponse = await axios.get(`${REACT_APP_SERVER_URL}/api/timelines/${timelineId}/`);
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

    const handleEntryDelete = (e, entryToDelete) => {
        // axios.delete(`${REACT_APP_SERVER_URL}/api/entries/${entry.id}/`, payload)
        axios.delete(`${REACT_APP_SERVER_URL}/api/entries/${entryToDelete.id}/`)
        .then(response => {
            console.log(response.data);
            loadTimeLineData();
        }).catch(error => {
            console.log('------------ ENTRY DELETE ERROR ------------');
            console.log(error);
            alert('Delete unsuccessful. Please try again.');
        })
    };

    const handleEntryUpdate = (e, data) => {
        e.preventDefault();
        console.log(data)
        axios.put(`${REACT_APP_SERVER_URL}/api/entries/${data.id}/`, data)
        .then(response => {
            console.log(response.data);
            loadTimeLineData();
        }).catch(error => {
            console.log('--------- ENTRY UPDATE ERROR ---------')
            console.log(error);
        })
    }

    const handleNewEntry = (e, data) => {
        e.preventDefault();
        console.log(data);
        // axios.post(`${REACT_APP_SERVER_URL}/api/entries/`, data, payload)
        axios.post(`${REACT_APP_SERVER_URL}/api/entries/`, data)
        .then(response => {
            console.log(response.data);
            loadTimeLineData();
        }).catch(error => {
            console.log(error);
            alert('Unsuccessful entry creation');
        });
    }

    const loadTimeLineData = async () => {
        setFinishedLoading(false);
        let timelineArray = [];

        for await (const id of timelineIds) {
            const entryArray = await getTimelineData(id);
            timelineArray.push(entryArray);
        }
        
        setTimelines(timelineArray);
        // console.log(timelineArray)
        let start = 0;
        let end = 1;

        if (timelineArray[0].length) {
            start = splitDateTime(timelineArray[0][0].datetime);
            end = splitDateTime(timelineArray[0][timelineArray[0].length-1].datetime);
    
            timelineArray.forEach(timeline => {
                if (timeline[0].datetime < start.date) start = splitDateTime(timeline[0].datetime);
                if (timeline[timeline.length-1].datetime > end.date) end = splitDateTime(timeline[timeline.length-1].datetime);
            })
        }

        setFrame([start, end]);
        setBigFrame([start, end]);
        setFinishedLoading(true);
    }

    useEffect( async () => {
        loadTimeLineData();
    }, [])

    if (!finishedLoading) {
        return (<p>...Loading</p>)
    }
    return (
        <div className="timeline-container">
            <div className="timeline-details">
                <></>
            </div>
            <div className="timeline-display">
                {timelines.map((t, idx) => (
                    <TimelineShow {...props} key={idx} user={props.user} title={props.location.state.timeline.title} entries={t} frame={frame} 
                    handleEntryUpdate={handleEntryUpdate} handleNewEntry={handleNewEntry} handleEntryDelete={handleEntryDelete} />
                ))}
            </div>
            <div className="timeline-controls" ></div>
        </div>
    )
}