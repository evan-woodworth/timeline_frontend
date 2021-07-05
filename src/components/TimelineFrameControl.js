import React, { useState } from 'react'

export default function TimelineFrameControl(props) {

    return (
        <div className="timeline-zoom-controls">
            <div className="btn btn-secondary" onClick={e=>props.handleZoom(e, -.2)}>-</div>
            <div className="timeline-zoom-display">{Math.round(100*props.zoom)} %</div>
            <div className="btn btn-secondary" onClick={e=>props.handleZoom(e, .2)}>+</div>
        </div>
    )
}
