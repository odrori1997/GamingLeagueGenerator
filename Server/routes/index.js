const firebase = require('firebase');
var cors = require('cors');

const User = require('../models/user.model');
const Event = require('../models/event.model');

var express = require('express');
var router = express.Router();


// // Configure Firebase.
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: "gaming-league-20cee.firebaseapp.com",
//   projectId: "gaming-league-20cee",
//   storageBucket: "gaming-league-20cee.appspot.com",
//   messagingSenderId: "308852548797",
//   appId: "1:308852548797:web:2e0fb0ff89d4291c07c3d4",
//   measurementId: "G-6DVXN4445B"
// };
// console.log(process.env.FIREBASE_API_KEY);
// firebase.initializeApp(firebaseConfig);

// router.use(function(req, res, next) {
//   console.log("Setting CORS headers in server.");
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

/* GET home page with calendar events. */
router.get('/events', function(req, res, next) {
    let location = req.params.location;
    let age = req.params.age;
    // if (location && age) {
    //   Events.find({age: age, location: location})
    //   .then((events) => res.json(events))
    //   .catch((err) => res.status(400).json("Error: " + err + "."));
    // }
});

/* GET User info when user logs in. */
router.get('/', (req, res, next) => {
  let user = firebase.auth().currentUser;
  if (user) {
    User.find({uuid: user.uuid})
    .then((userInfo) => res.json(userInfo))
    .catch((err) => res.status(500).json("Error: " + err + "."));
  }
  else {
    res.json("User not logged in.");
  }

});

/* POST User age + location. */
router.post('/', (req, res, next) => {
  console.log("Entered createUser()", req.body);
  let uuid = req.body.uuid;
  let location = req.body.location;
  let age = req.body.age;
  let displayName = req.body.displayName;

  const newUser = new User({
    uuid: uuid,
    location: location,
    age: age,
    displayName: displayName
  });

  newUser.save()
    .then(() => res.status(200).json("User successfully added."))
    .catch(err => res.status(500).json("Error: " + err + "."));
});

/* POST User registering for an event. */
router.post('/events', (req, res, next) => {
  let eventID = req.body.eventID;
  let userID = req.body.userID;
});


module.exports = router;
