import React from 'react';

const About = () => {
    return (
        <div className="container">
            <div>
                <h2 className="mb-5" style={{fontWeight:"600"}}>About Jikangu</h2>
                <h4>What is Jikangu?</h4>
                <p>Jikangu is a web app that makes it simple to create timelines of your favorite subjects. Whether its world events, historical figures, or your favorite super heroes, Jikangu lets you visually depict these items in  an easy to read, chronological timeline.</p>
                <h4>What does Jikangu mean?</h4>
                <p>Jikangu is a portmanteau of the Japanese words “jikan” and “gu”, which mean "time" and "tool", respectively. </p>
            </div>
            <div className="mt-5">
                <h2 style={{fontWeight:"600"}}>Meet the Team</h2>
                <div className="teamContainer">
                    <div className="teamCard">
                        <p className="teamTitle">Evan Woodworth</p>
                        <a href="https://linkedin.com/in/evan-woodworth">LinkedIn</a>
                        <img src="/img/evan-profile-pic.jpeg" alt="profile picture" />
                    </div>
                    <div className="teamCard">
                        <p className="teamTitle">Maurice Chevez</p>
                        <a href="https://www.linkedin.com/in/maurice-chevez/">LinkedIn</a>
                        <img src="/img/maurice-profile-pic.jpeg" alt="profile picture" />
                    </div>
                    <div className="teamCard">
                        <p className="teamTitle">Thomas Duong</p>
                        <a href="">LinkedIn</a>
                        <img src="https://ca.slack-edge.com/T0351JZQ0-U01R17BAV9P-718ee2b11770-512" alt="profile picture" />
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col text-center"><span>{'Check out the Github Repositories: '}
                    <a href="https://github.com/evan-woodworth/timeline_frontend">{'Front End (React.js)'}</a>{", "} 
                    <a href="https://github.com/evan-woodworth/timeline_backend">{'Back End (Django)'}</a></span>
                </div>
            </div>
        </div>
    )
}

export default About;