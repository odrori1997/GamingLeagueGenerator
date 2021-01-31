import firebase from 'firebase';

var express = require('express');
var router = express.Router();


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
console.log(process.env.FIREBASE_API_KEY);
firebase.initializeApp(firebaseConfig);

/* GET home page with calendar events. */
router.get('/', function(req, res, next) {
    
});


module.exports = router;
