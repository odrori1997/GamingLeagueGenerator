import React, { Component, useContext } from 'react'
import UserContext from '../Providers/UserProvider';

function Home() {
    console.log("Entered Home componenet");
    const user = useContext(UserContext);
    console.log("Current user: ",user);
    console.log(UserContext);
    if (user) {
        return (
            <div className="bg-light">
                <h1 id="header" className="display-1">You're logged in as {user.displayName}.</h1>
            </div>
        )
    }
    else {
        return (
            <div className="bg-light">
                <h1 id="header" className="display-1">Hi I'm Omer, and this is my Gaming League Generator. Sign in to pair up with people your age and in your location!</h1>
            </div>
        )
    }
}

export default Home;