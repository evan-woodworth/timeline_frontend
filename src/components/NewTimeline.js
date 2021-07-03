import React, {useState} from 'react';
import axios from 'axios';
const REACT_APP_SERVER_URL = process.env.REACT_APP_SERVER_URL

const NewTimeline = (props) => {
  const payload = {headers: {Authorization: `JWT ${localStorage.getItem('jwtToken')}`}}
  const [title, setTitle] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleIsPrivate = (e) => {
    if (e.target.checked === true) {
      setIsPrivate(true);
    }
    if (e.target.checked === false) {
      setIsPrivate(false);
    }
  }

  const data = {
    user: `${props.user.user_id}`,
    title: title,
    private: isPrivate
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post(`${REACT_APP_SERVER_URL}/api/timelines/`, data, payload)
    axios.post(`${REACT_APP_SERVER_URL}/api/timelines/`, data)
    .then(response => {
      console.log(response.data);
      alert('Timeline created');
    }).catch(error => {
      console.log(error)
      alert('Unsuccessful')
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>New Timeline Page</h1>
          <label htmlFor="title">Timeline Title</label>
            <input type="text" name="title" value={title} onChange={handleTitle} />
          <br/>
          <label htmlFor="private">Private
            <input type="checkbox" name="private" value={isPrivate} onChange={handleIsPrivate} />
            <span className="slider round"></span>
          </label>
          <br/>
          <button type="submit" className="btn btn-primary">Next</button>
      </form>
    </div>
  )
}

export default NewTimeline
