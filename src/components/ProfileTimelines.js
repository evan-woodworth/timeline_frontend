import React, {useState,useEffect} from 'react'
import axios from 'axios'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

//variables

const Entry = (props) => {
  const currentID = props.match.params.id
  const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
  const [entries, setEntries] = useState([])
  const [finishedLoading, setFinishedLoading] = useState(false)

  useEffect(()=>{
  const url = `${REACT_APP_SERVER_URL}/api/timelines`
    axios.get(url, payload)
    .then((response)=>{
      console.log(response.data[currentID - 1].entries)
      setEntries(response.data[currentID - 1].entries)
      setFinishedLoading(true)
    })
    .catch(( err) =>{
      console.log(err)
    })
  }, [])


// console.log(entries)
// console.log(entries[0]["title"])


const allEntriesFromTimeline = entries.map((ele,index)=>{
  console.log(ele["title"])
  return (
  <>
  <li key={index} style={{fontWeight:"700"}}>{ele["title"]}</li>
  <li key={index}>{ele["description"]}</li>
  <li key={index} style={{fontWeight:"700"}}>Created on {ele["datetime"]}</li>
  <hr />
  </>)
})

if (!finishedLoading) {
  return (<p>...Loading</p>)
}

  return (
    
    <div className="container">
      <h4>Current Timeline: ID {currentID} </h4>
      <button>Edit this timeline</button>
      <hr />
        <div className="card card-body">
          <ul>
            {allEntriesFromTimeline.length ? allEntriesFromTimeline : <li>No entries found</li>}
          </ul>
          
        </div>
      

    </div>
  )
}

export default Entry
