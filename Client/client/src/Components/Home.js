import React, { Component, useState } from 'react'
import firebase from 'firebase';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            signedIn: this.props.signedIn
        };
        this.handleSignIn = this.handleSignIn.bind(this);
    }

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    console.log(this.state.user);
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user, user: user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

    handleSignIn(user) {
        console.log("Entered Home.handleSignIn function", user);


        if(!user) {
            console.log("No user signed in.");
        }

        document.getElementById('login-status').textContent = "Signed In"
        return (
          <div className="bg-light">
            <h1 id="header" className="display-1">You're signed in as {user.displayName}</h1>
          </div>
        )
    }

    render() {
      console.log(this.props);
          if (!this.state.signedIn) {
            return (
              <div className="bg-light">
                <h1 id="header" className="display-1">Hi I'm Omer, and this is my Gaming League Generator. Sign up to pair up with people your age and in your location!</h1>
              </div>
            )
          }
          return (
            this.handleSignIn(this.state.user)
          )
    }
}