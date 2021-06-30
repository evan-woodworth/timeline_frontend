import axios from 'axios';

// This utility will add the authorized user's JWT to the request header
// Any routes that are protected will require the JWT in order to access them.

const setAuthToken = (token) => {
    if (token) {
        // If true: Apply the token to every request header, especially private routes
        axios.defaults.headers.common['Authorization'] = token;
        // console.log('----------- HEADERS -----------');
        // console.log(axios.defaults.headers.common);
    } else {
        // If false: Remove the authorization
        delete axios.defaults.headers.common['Authorization']
    }
};

export default setAuthToken;