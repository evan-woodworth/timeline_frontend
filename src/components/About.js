import React from 'react';

const About = () => {
    return (
        <div>
          <div>
            <h1 className="mb-5" style={{fontWeight:"800"}}>About Jikangu</h1>
            <h3>What is Jikangu?</h3>
            <p>Jikangu is a web app that makes it simple to create timelines of your favorite subjects. Whether its world events, historical figures, or your favorite super heroes, Jikangu lets you visually depict these items in  an easy to read, chronological timeline.</p>
            <h3>What does Jikangu mean?</h3>
            <p>Jikangu is a portmanteau of the Japanese words “jikan” and “gu”, which mean "time" and "tool", respectively. </p>
          </div>
          <div className="mt-5">
            <h1 style={{fontWeight:"800"}}>Meet the Team</h1>
            <div className="container">
              <div className="row">
                <div className="col">Name
                <img src="https://via.placeholder.com/300.png/09f/fff000" alt="Team Member" />
                </div>
                <div className="col">Name
                <img src="https://via.placeholder.com/300.png/09f/fff000" alt="Team Member" />
                </div>
                <div className="col">Name
                <img src="https://via.placeholder.com/300.png/09f/fff000" alt="Team Member" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
    )
}

export default About;