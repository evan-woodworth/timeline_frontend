import React, {useState,useEffect} from 'react'
import axios from 'axios'

const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL


const Entry = (props) => {
  const currentID = props.match.params.id
  const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
  const [entries, setEntries] = useState({})
  useEffect(()=>{
  const url = `${REACT_APP_SERVER_URL}/api/timelines`
    axios.get(url, payload)
    .then((response)=>{
      console.log(response.data[currentID - 1].entries)
      setEntries(response.data[currentID - 1].entries)
    })
    .catch(( err) =>{
      console.log(err)
    })
  }, [])
  
  console.log(entries)
  console.log(typeof(entries))


//  let allEntries = entries.map((entry,index)=>{
//    console.log(entry)
//    return ( <></>)
//  })

  

  return (
    
    <div className="container">
      <h4>Current Timeline: ID {currentID} </h4>
      <button>Edit this timeline</button>
      <hr />
        <div className="card card-body">
          
        </div>
      

    </div>
  )
}

export default Entry
