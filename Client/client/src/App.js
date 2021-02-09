import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import EventForm from './Components/EventForm';
import firebase from 'firebase';
import React, { Component, createContext} from 'react';
import UserContext from './Providers/UserProvider';
import { createUniqueID } from './helper';

// Configure Firebase.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyATcfXnQpEIXvJYMlt5yS6Ub8bqQ0AivVk',
  authDomain: "gaming-league-20cee.firebaseapp.com",
  projectId: "gaming-league-20cee",
  storageBucket: "gaming-league-20cee.appspot.com",
  messagingSenderId: "308852548797",
  appId: "1:308852548797:web:2e0fb0ff89d4291c07c3d4",
  measurementId: "G-6DVXN4445B"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
const axios = require('axios');

export const logInFromServer = async () => {
  const user = auth.currentUser;
  const env = process.env.ENVIRONMENT || "http://localhost:3000/";
  const userID = user ? createUniqueID(user.uid) : null;
  const url = user && userID ? env + "user/" + userID : env;
  console.log("Hitting this URL to retrieve userInfo", url);
  axios({
      method: 'get',
      url: url 
  })
      .then(res => {
        console.log("Server response to get Userinfo: ", res);
        const userResponse = (res.data && res.data[0]) ? res.data[0] : {displayName: user.displayName, uid: userID, location: "Not Created", age: 18};
        console.log("Setting user state to", userResponse);
        this.setState({user: userResponse})
      })
      .catch(err => console.log("Error: ", err));
}

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.setUser = (newUserInfo) => this.setState({
      user: newUserInfo
    });
    this.state = {
      user: null,
      setUser: this.setUser
    }
  }

  componentDidMount = async () => {
    auth.onAuthStateChanged((output) => {
        const user = auth.currentUser;
        console.log("Auth state changed:",user);
        // user just logged in
        if (user) {
          const env = process.env.ENVIRONMENT || "http://localhost:3000/";
          const userID = createUniqueID(user.uid);
          const url = userID ? env + "user/" + userID : env;
          console.log("Hitting this URL to retrieve userInfo", url);
          axios({
              method: 'get',
              url: url 
          })
              .then(res => {
                console.log("Server response to get Userinfo: ", res);
                const userResponse = (res.data && res.data[0]) ? res.data[0] : {displayName: user.displayName, uid: userID, location: "Not Created", age: 18};
                console.log("Setting user state to", userResponse);
                this.setState({user: userResponse})
              })
              .catch(err => console.log("Error: ", err));
          }
        // user just logged out
        else {
          this.setState({
            // user: null
          })
        }
    })
  }

  render() {
    console.log("In App", this.state.user);
    return (
      <div className="App">
        <div>
          <Router>
            <UserContext.Provider value={this.state}>
            <Navbar user={this.state.user} />
              <Route path = "/" exact component = {Home} />
              <Route path = "/login" component = {SignUp} />
              {/* <Route path = "/logout" component = {LogOut} /> */}
              <Route path="/createEvent" component = {EventForm} />
            </UserContext.Provider>
          </Router>
        </div>
      </div>
    );
  }
}