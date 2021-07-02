import React, {useState, useEffect}  from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const MyTimelines = () => {
  const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
  const [timelines, setTimelines] = useState([])
  useEffect(()=>{
  const url = `${REACT_APP_SERVER_URL}/api/timelines`
    axios.get(url, payload)
    .then((response)=>{
      console.log(response.data)
      setTimelines(response.data)
    })
    .catch(( err) =>{
      console.log(err)
    })
  }, [])

const allTimelines = timelines.map((timeline,index)=>{
  let entriesCount = timelines[index].entries.length
  return (
    <>
    <Link to={'profiletimelines/'+timeline.id}><li key={index}>{timeline.title} - Entries: {entriesCount} </li></Link>
    </>
    )
}
  )

return (
    <div>
      <h2>Your Current Timelines:</h2>
      <div className="container">
        <div className="row">
        <ul> {allTimelines.length ? allTimelines : <li>No Timelines Found</li>} </ul>
        </div>
      </div>
    </div>
  )
}

export default MyTimelines
