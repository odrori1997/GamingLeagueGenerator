import React, { Component, useContext } from 'react'
import UserContext from '../Providers/UserProvider';
import UserForm from './UserForm';
import Events from './Events';

const axios = require('axios');

function Home() {
    console.log("Entered Home componenet");
    const user = useContext(UserContext);
    console.log("Current user: ",user);
    const env = process.env.ENVIRONMENT || "http://localhost:3000/";
    let url = env + 'home'
    const users = axios({
        method: 'get',
        url: url, 
    })
        .then(res => console.log("Fetching users from server. ", res))
        .catch(err => console.log("Error: ", err));

    console.log("MongoDb response", users);
    
    /* Page shown to existing user. */
    if (user && user.location != "Not Created") {
        // TODO
        // show events here
        return (
            <div className="bg-light">
                <h1 id="header" className="display-1">You're logged in as {user.displayName}.</h1>
                <Events user={user} />
            </div>
        )
    }
    /* First-time user, create profile page. */
    else if (user && user.location == "Not Created") {
        return (
            <div>
                <h1>Please fill out the form below to complete your profile.</h1>
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