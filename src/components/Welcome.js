import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const Welcome = (props) => {
    const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}

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

    return (
      <>
      <header /> 
        <div className="container">
          <div className="header-tagline__container">
            <h1 style={{fontWeight:"700", marginBottom:"5px"}}>Make learning fun </h1>
            <p className="h5">Create easy to read timelines of your favorite subjects</p>
            <Link to="/newtimeline"><button className="btn btn-primary mt-1">Make a Timeline</button></Link>
          </div>

          <div>
            <h1>Some Feature.</h1>
            <div className="feature-text">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quidem cupiditate suscipit fugiat error architecto nesciunt illum, repellendus nisi earum quam facilis expedita laboriosam dolor quibusdam temporibus, eius numquam nihil.
              Alias, nobis dolorum culpa aspernatur expedita mollitia odit voluptas a, optio labore consequuntur dolore obcaecati, eaque sit voluptatibus qui repudiandae? Pariatur natus molestias saepe totam delectus nemo beatae cum! Sit!
              Neque aut eum corporis libero recusandae officia, ab laboriosam at ratione fugiat consequatur illo maiores, ea accusamus facilis qui voluptate impedit. Fugit possimus magnam ex impedit aliquam. Eligendi, ipsum facilis!</p>
            </div>
          </div>

            { props.user ? (
            <div>
                <button className="btn btn-primary" onClick={handleUserData}> Users Data </button>
                <button className="btn btn-secondary" style={{ margin: '10px' }} onClick={handleEntries}> Entries </button>
            </div>
            ) :

            <></>
            }
        </div>
      </>
    )
}

export default Welcome;