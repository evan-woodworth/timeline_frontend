import React from 'react';

const About = () => {
    return (
        <div>
          <div>
            <h2 className="mb-5" style={{fontWeight:"600"}}>About Jikangu</h2>
            <h4>What is Jikangu?</h4>
            <p>Jikangu is a web app that makes it simple to create timelines of your favorite subjects. Whether its world events, historical figures, or your favorite super heroes, Jikangu lets you visually depict these items in  an easy to read, chronological timeline.</p>
            <h4>What does Jikangu mean?</h4>
            <p>Jikangu is a portmanteau of the Japanese words “jikan” and “gu”, which mean "time" and "tool", respectively. </p>
          </div>
          <div className="mt-5">
            <h2 style={{fontWeight:"600"}}>Meet the Team</h2>
            <div className="container card card-body">
              <div className="row">
                <div className="col">Name
                <img className="img-fluid" src="https://via.placeholder.com/300.png/09f/fff000" alt="Team Member" />
                </div>
                <div className="col">Name
                <img className="img-fluid" src="https://via.placeholder.com/300.png/09f/fff000" alt="Team Member" />
                </div>
                <div className="col">Name
                <img className="img-fluid" src="https://via.placeholder.com/300.png/09f/fff000" alt="Team Member" />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col text-center"><span>Check out the <a href="https://github.com/evan-woodworth/timeline_frontend">Github repo</a></span></div>
              </div>
            </div>
            
          </div>
        </div>
        
    )
}

export default About;