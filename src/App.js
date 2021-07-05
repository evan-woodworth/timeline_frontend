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
import TimelineContainer from './components/TimelineContainer';
import ProfileTimelines from './components/ProfileTimelines'
import MyTimelines from './components/MyTimelines';
import PublicTimeline from './components/PublicTimeline'

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
        <div className="mx-5 mt-5">
            <Switch>
                <Route exact path='/' render={(props) => <Welcome {...props} user={currentUser} />} />
                <Route path='/signup' render={(props) => <Signup {...props} nowCurrentUser={nowCurrentUser} />} />
                <Route path='/login' render={(props) => <Login {...props} user={currentUser} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/about' component={About} />
                {/* <Route path='/publictimelines' component={PublicTimeline} /> */}
                {/* <Route path='/profiletimelines/:id' render={(props) => <ProfileTimelines {...props} />} /> */}
                <PrivateRoute path='/mytimelines' component={MyTimelines} user={currentUser} />
                <PrivateRoute path='/timelines' component={TimelineContainer} user={currentUser} />
                <PrivateRoute path='/profile' component={Profile} user={currentUser} handleLogout={handleLogout} />
                <Route path='*' component={Welcome} />
            </Switch>
        </div>
        <Footer />
        </div>
    );
}

export default App;