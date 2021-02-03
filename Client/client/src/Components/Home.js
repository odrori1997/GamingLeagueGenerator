import React, { Component, useContext } from 'react'
import UserContext from '../Providers/UserProvider';
import UserForm from './UserForm';

const axios = require('axios');

function Home() {
    // constructor(props) {
    //     super(props);
    //     this.state = {

    //     }
    // }
    console.log("Entered Home componenet");
    const user = useContext(UserContext);
    console.log("Current user: ",user);
    const userInfo = axios.get('/')
        .then(res => console.log("Fetching user data from server. ", res))
        .catch(err => console.log("Error: ", err));
    
    /* Page shown to existing user. */
    if (user && userInfo.data) {
        // TODO
        // show events here
        return (
            <div className="bg-light">
                <h1 id="header" className="display-1">You're logged in as {user.displayName}.</h1>
            </div>
        )
    }
    /* First-time user, create profile page. */
    else if (user && !userInfo.data) {
        // TODO
        // prompt user to complete profile
        // add form requesting age and location data here
        return (
            <div>
                <h1>No UserInfo.</h1>
                <UserForm userInfo={user} />
            </div>
        )
    }
    /* Guest homepage. */
    else {
        return (
            <div className="bg-light">
                <h1 id="header" className="display-1">Hi I'm Omer, and this is my Gaming League Generator. Sign in to pair up with people your age and in your location!</h1>
            </div>
        )
    }
}

export default Home;