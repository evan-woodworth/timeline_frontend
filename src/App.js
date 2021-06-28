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

// PRIVATE ROUTE COMPONENTS
const PrivateRoute = ({component: Component, ...rest }) => {
    console.log('This is a private route...')
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
        console.log('is not authenticated...');
        setIsAuthenticated(false);
    } else {
        token = jwt_decode(localStorage.getItem('jwtToken'));
        console.log('token', token);
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
      <Navbar isAuth={isAuthenticated}  handleLogout={handleLogout} />
      <div className="container mt-5">
          <Switch>
              <Route exact path='/' component={Welcome} />
              <Route path='/signup' render={(props) => <Signup {...props} nowCurrentUser={nowCurrentUser}/>} />
              <Route path='/login' render={(props) => <Login {...props} user={currentUser} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated}/>} />
              <Route path='/about' component={About} />
              <PrivateRoute path='/profile' component={Profile} user={currentUser} handleLogout={handleLogout} />
          </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;