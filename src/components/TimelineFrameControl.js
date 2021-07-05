import React, { useState } from 'react'

export default function TimelineFrameControl(props) {
    const [currentZoom, setCurrentZoom] = useState(props.zoom);

    return (
        <div className="timeline-zoom-controls">
            <div className="btn btn-secondary" onClick={e=>props.handleZoom(e, -.2)}>-</div>
            <p className="timeline-zoom-display">{Math.floor(100*props.zoom)} %</p>
            <div className="btn btn-secondary" onClick={e=>props.handleZoom(e, .2)}>+</div>
        </div>
    )
}
