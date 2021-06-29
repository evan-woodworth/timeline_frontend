import React from 'react'
import ReactDOM from 'react-dom'

export default function Test(props) {
    // const { items } = props

    const items = [
        {
            name: 'point 1',
            active: true,
        },
        {
            name: 'point 2',
            active: true,
        },
        {
            name: 'point 3',
            active: false,
        },
        {
            name: 'point 4',
            active: false,
        }
    ]
    

    return (
        <div className="timeline">
            <div className="timeline-current-point"></div>
            <div className="timeline-entries">
                { items.map((item,i) => (
                    <div key={i} className={"timeline-entry-point" + ( item.active ? " active" : "")}>
                        <div className="timeline-entry">
                            {item.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

ReactDOM.render(<Test />, document.getElementById('root'))