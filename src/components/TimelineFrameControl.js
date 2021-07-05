import React, { useState } from 'react'

export default function TimelineFrameControl(props) {
    const [leftBound, setLeftBound] = useState(props.frame[0].date);
    const [rightBound, setRightBound] = useState(props.frame[1].date);

    const handleLeftBound = (e) => {
        setLeftBound(e.target.value);
        console.log(e.target.value)
        props.handleLeftBound(e.target.value)
    }

    const handleRightBound = (e) => {
        setRightBound(e.target.value);
        props.handleRightBound(e.target.value)
    }

    return (
        <div>
            <div className="timeline-frame-indicator">
                <div className="timeline-frame-left" style={{'--line-position': `${leftBound.daySync}`}}></div>
                <div className="timeline-frame-right" style={{'--line-position': `${rightBound.daySync}`}}></div>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="leftBound"> From: </label>
                    <input className="form-control" type="date" name="leftBound" value={leftBound} onChange={handleLeftBound}/>
                </div>
                <div className="form-group">
                    <label htmlFor="rightBound"> To: </label>
                    <input className="form-control" type="date" name="rightBound" value={rightBound} onChange={handleRightBound}/>
                </div>
            </form>
        </div>
    )
}
