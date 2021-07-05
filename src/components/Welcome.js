import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Welcome = (props) => {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
    const [publicTimelines, setPublicTimelines] = useState([])
    const [finishedLoading, setFinishedLoading] = useState(false)
  
  useEffect(()=>{
    const url = `${REACT_APP_SERVER_URL}/api/timelines`
    axios.get(url)
    .then(response =>{
      let pulledData = response.data
      console.log(pulledData)
      setPublicTimelines(pulledData)
      setFinishedLoading(true)
    }).catch(err =>{
      console.log(err)
     
    }) 
  }, [])

    const handleUserData = (e) => {
        axios.get(`${REACT_APP_SERVER_URL}/api/users/`, payload)
        .then(response => {
            console.log(response.data);
      
        }).catch(error => {
            console.log(error);
            alert('Please login to view data.')
        });
    };

    const handleEntries = (e) => {
        axios.get(`${REACT_APP_SERVER_URL}/api/entries`, payload)
        .then(response => {
            console.log(response.data);
        }).catch(error => console.log(error))
    }
    console.log(publicTimelines)

    const featuredTimeLines = publicTimelines.map((timeline, index)=>(
      <p>{timeline.title}</p>
      )
    )


    if(!finishedLoading){
      return (<p>...Loading</p>)
    }

    return (
      <>
      <header /> 
        <div className="container">
          <div className="header-tagline__container">
            <h1 className="header-tagline">Make learning fun </h1>
            <p className="h5">Create easy to read timelines of your favorite subjects</p>
            <Link to="/login"><button className="btn btn-primary mt-1">Get Started</button></Link>
          </div>

          <div className="container featured-timeline__container">
            <div className="row"><h3 className="mb-4" style={{fontWeight:"700"}}>Featured Timelines</h3></div>
            
              <div className=" row" >
                <div className="col-sm-4 featured-card">
                <img className="img-thumbnail rounded mb-2" src={publicTimelines[0]["entries"][4]["image"]} alt="Featured 1" />
                <Link to={"/publictimelines"}>
                  <h5 className="card-title">{publicTimelines[0]["title"]}</h5>
                </Link>
    
                </div>
                <div className="col-sm-4 featured-card">
                  <img className="img-thumbnail rounded mb-2" src="https://via.placeholder.com/350x250" alt="Featured 1" />
                  <h5 className="card-title">{publicTimelines[3]["title"]}</h5>
                  
                </div>
                <div className="col-sm-4 featured-card">
                 <img className="img-thumbnail rounded mb-2" src="https://via.placeholder.com/350x250" alt="Featured 1" />
                  <h5 className="card-title">{publicTimelines[2]["title"]}</h5>
                  
                </div>
              </div>
{/* <button type="button">Hello World</button> */}
          </div>
        </div>
      </>
    )
}

export default Welcome;