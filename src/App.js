// IMPORTS
import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';

// CSS
import './App.css';

// COMPONENTS
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import About from './components/About';
import NewTimeline from './components/NewTimeline'
import TimelineContainer from './components/TimelineContainer';
import Test from './components/Test';
import ProfileTimelines from './components/ProfileTimelines'

const entries = [
    {
        title: 'Entry 1a',
        "timeline": "Test Timeline",
        summary: 'Some Stuff',
        datetime: "2021-01-01T14:11:00-05:00",
        image: "https://i.imgur.com/60IQydY.jpeg",
        details: "blah blah blah"
    },
    {
        title: 'Entry 1b',
        "timeline": "Test Timeline",
        summary: 'Some Stuff',
        datetime: "2021-01-04T14:11:00-05:00",
        image: "https://i.imgur.com/60IQydY.jpeg",
        details: "blah blah blah"
    },
    {
        title: 'Entry 1c',
        "timeline": "Test Timeline",
        summary: 'Some Stuff',
        datetime: "2021-01-05T14:11:00-05:00",
        image: "https://i.imgur.com/60IQydY.jpeg",
        details: "blah blah blah"
    },
    {
        title: 'Entry 1d',
        "timeline": "Test Timeline",
        summary: 'Some Stuff',
        datetime: "2021-01-10T14:11:00-05:00",
        image: "https://i.imgur.com/60IQydY.jpeg",
        details: "blah blah blah"
    },
    {
        title: 'Entry 2',
        "timeline": "Test Timeline",
        summary: 'Some Other Stuff',
        datetime: "2021-03-01T14:11:00-05:00",
        image: "",
        details: "blah blah blah"
    },
    {
        title: 'Entry 3',
        "timeline": "Test Timeline",
        summary: 'Some More Stuff',
        datetime: "2021-04-01T14:11:00-05:00",
        image: "https://i.imgur.com/KXcLOHo.jpeg",
        details: "blah blah blah"
    },
    {
        title: 'Entry 4',
        "timeline": "Test Timeline",
        summary: 'Some More Stuff',
        datetime: "2021-05-15T14:11:00-05:00",
        image: "https://i.imgur.com/KXcLOHo.jpeg",
        details: "blah blah blah"
    },
    {
        title: 'Entry 5',
        "timeline": "Test Timeline",
        summary: 'Some More Stuff',
        datetime: "2021-06-15T14:11:00-05:00",
        image: "https://i.imgur.com/KXcLOHo.jpeg",
        details: "blah blah blah"
    },
    {
        title: 'Entry 6',
        "timeline": "Test Timeline",
        summary: 'Some Sort of Stuff',
        datetime: "2021-06-20T14:11:00-05:00",
        image: "",
        details: "blah blah blah"
    },
    {
        title: 'Entry 7',
        "timeline": "Test Timeline",
        summary: 'Some Sort of Stuff',
        datetime: "2021-07-01T14:11:00-05:00",
        image: "",
        details: "blah blah blah"
    }
]

// PRIVATE ROUTE COMPONENTS
const PrivateRoute = ({component: Component, ...rest }) => {
    let user = localStorage.getItem('jwtToken');
    return <Route {...rest} render={ (props) => {
        return user ? <Component {...rest} {...props} /> : <Redirect to='/login' />
    }} />
};

function App() {
    const [currentUser, setCurrentUser] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        let token;
        // If false: there is no token inside localStorage, then the user is not authenticated
        if (!localStorage.getItem('jwtToken')) {
            setIsAuthenticated(false);
        } else {
            token = jwt_decode(localStorage.getItem('jwtToken'));
            // console.log('Token', token);
            setAuthToken(token);
            setCurrentUser(token);
        }
    }, []);

    const nowCurrentUser = userData => {
        console.log('---------- INSIDE NOWCURRENTUSER ----------');
        setCurrentUser(userData);
        setIsAuthenticated(true); 
    };

    const handleLogout = () => {
        if (localStorage.getItem('jwtToken')) {
            localStorage.removeItem('jwtToken');    // If there is a token, then remove it
            setCurrentUser(null);                   // Set the currentUser to null
            setIsAuthenticated(false)               // Set is auth to false
        }
    };

    return (
        <div className="App">
        <Navbar isAuth={isAuthenticated} handleLogout={handleLogout} />
        <div className="container mt-5">
            <Switch>
                <Route exact path='/' render={(props) => <Welcome {...props} user={currentUser} />} />
                <Route path='/newtimeline' component={NewTimeline} />
                <Route path='/signup' render={(props) => <Signup {...props} nowCurrentUser={nowCurrentUser} />} />
                <Route path='/login' render={(props) => <Login {...props} user={currentUser} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/about' component={About} />
                <Route path='/timelines' component={TimelineContainer} />
                <Route path='/profiletimelines/:id' render={(props) => <ProfileTimelines {...props} />} />
                <Route path='/test' render={(props) => <Test {...props} user={currentUser} entries={entries} title={'Timeline'} />} />
                <PrivateRoute path='/profile' component={Profile} user={currentUser} handleLogout={handleLogout} />
            </Switch>
        </div>
        <Footer />
        </div>
    );
}

export default App;