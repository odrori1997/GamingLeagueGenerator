import React, { useState, useContext } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import Modal from 'react-bootstrap/Modal';
import { Redirect } from 'react-router-dom';
import Home from './Home';
import UserContext from '../Providers/UserProvider';

function SignUp() {
  
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  

  const user = useContext(UserContext);

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
        console.log("Successfully signed in...");
        handleClose();
        console.log(firebase.auth().currentUser);
        return (
          <Redirect to="/home" />
        )
      }
    }
 };
  // if user is logged in, then log them out
  // if (user) {
  //   firebase.auth().signOut();
  //   return (
  //     <div>
  //       <Redirect to="/home" />
  //     </div>
  //   )
  // }
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Please Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
          </Modal.Body>
        </Modal>
    </div>
  );
 };
export default SignUp;