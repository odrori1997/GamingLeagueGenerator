import React, { Component, useContext, useState } from 'react'
import UserForm from './UserForm'
import UserContext from '../Providers/UserProvider'
import firebase from 'firebase'

const axios = require('axios');

function UserProfile() {

    const [ showEdit, setEdit ] = useState(false);
    const ucInstance = useContext(UserContext);
    const user = ucInstance.user;
    const setUser = ucInstance.setUser;

    console.log("Entered UserProfile component", user);

    function deleteUser() {
        const env = process.env.ENVIRONMENT || "http://localhost:3000/";
        const url = env + "/deleteUser";
        axios({
            method: 'delete',
            url: url, 
            data: { uid: user.uid }
        })
            .then(() => {
                console.log("Successfully deleted user.");
            })
            .catch(err => console.log("Error: ", err));

            // sign out
            firebase.auth().signOut();
            setUser(null);
    }


    if (showEdit) {
        return (
            <div>
                <UserForm userInfo={user} setUser={setUser} setEdit={setEdit} />
                <button className="btn btn-primary" onClick={() => setEdit(false)}>Go Back</button>
            </div>
        )
    }

    if (user) {
        return (
            <div>
    
                <h1 className="display-1">Welcome, {user.displayName}</h1>
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Basic Info</h3>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            <li className="list-group-item">Age {user.age}</li>
                            <li className="list-group-item">Location {user.location}</li>
                        </ul>
                    </div>
                </div>
                <button className="btn btn-primary mt-2" onClick={() => setEdit(true)}>Edit Profile</button>
                <br />
                <button className="btn btn-primary mt-2" onClick={deleteUser}>Delete Profile</button>
            </div>
        )
    }

    else {
        return (
            <div>
                <h1 className="display-1">Please log in.</h1>
            </div>
        )
    }

    
}

export default UserProfile;