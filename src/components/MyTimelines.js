import React, {useState, useEffect}  from 'react'
import axios from 'axios'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const MyTimelines = () => {
  const [timelines, setTimelines] = useState([])
  useEffect(()=>{
  const url = `${REACT_APP_SERVER_URL}/api/timelines`
    axios.get(url)
    .then((response)=>{
      console.log(response.data)
      setTimelines(response.data)
    })
    .catch(( err) =>{
      console.log(err)
    })
  }, [])

// Required variable for counting amount of timelines
const numTimeslines = timelines.length

const allTimelines = timelines.map((timeline,index)=>{
  return (
    <li key={index}>{timeline.title} - Entries: {numTimeslines} </li> )
}
  )

return (
    <div>
      <h2>Your Current Timelines:</h2>
      <div className="container">
        <div className="row">
        <ul> {allTimelines} </ul>
        </div>
      </div>
    </div>
  )
}

export default MyTimelines
