const firebase = require('firebase');
var cors = require('cors');

const User = require('../models/user.model');
const Event = require('../models/event.model');

var express = require('express');
var router = express.Router();

/* GET home page with calendar events. */
router.get('/events/:location/:age', function(req, res, next) {
  console.log("In getEvents()", req.params);
    let location = req.params.location;
    let age = req.params.age;
    if (location && age) {
      Event.find({ageMin: { $lt: age }, ageMax: { $gt: age }, location: location})
      .then((events) => res.status(200).json(events))
      .catch((err) => res.status(400).json("Error: " + err + "."));
    }
});

/* GET User info when user logs in. */
router.get('/home', (req, res, next) => {
  console.log("Entered home()");

  User.find({})
  .then((users) => {res.status(200); console.log("MongoDB response:", users); res.json(users); })
  .catch((err) => res.status(500).json("Error: " + err + "."));

});

/* GET specific info on one user. */
router.get('/user/:id', (req, res, next) => {
  console.log("Entered getUserInfo()");
  const uid = req.params.id;
  User.find({uid: uid}).then((user) => res.status(200).json(user)).catch((err) => res.status(500).json("Error:" + err + "."));
})

/* POST User age + location. */
router.post('/addUser', async (req, res, next) => {
  // User.remove({}, () => {console.log("successfully removed")});
  console.log("Entered createUser()", req.body);
  let uid = req.body.uid;
  let location = req.body.location;
  let age = req.body.age;
  let displayName = req.body.displayName;

  const newUser = new User({
    uid: uid,
    location: location,
    age: age,
    displayName: displayName
  });

  newUser.save()
    .then(() => res.status(200).json("User successfully added."))
    .catch(err => res.json("Error: " + err + "."));
});

/* POST User registering for an event. */
router.post('/events', async (req, res, next) => {
  console.log("Entered registerUserForEvent()");
  let eventID = req.body.eventID;
  let user = req.body.user;
  let event = await Event.findOne({"eventID": eventID});
  let participants = event.participants.push(user);
  console.log("Event:", event);
  console.log("Participants:", participants);
  console.log("User:", user);
  Event.updateOne(
    { "eventID": eventID },
    { "participants": participants }
  )
});

/* POST User hosting an event. */
router.post('/events/create', (req, res, next) => {
  console.log("Entered createEvent()", req.body);
  // let eventID = req.body.eventID;
  let eventName = req.body.eventName;
  let date = req.body.date;
  let ageMin = req.body.ageMin;
  let ageMax = req.body.ageMax;
  let location = req.body.location;
  let participants = [];
  let hostID = req.body.hostID;
  const newEvent = new Event({
    eventName: eventName,
    date: date,
    ageMin: ageMin,
    ageMax: ageMax,
    location: location,
    participants: participants,
    hostID: hostID
  });

  newEvent.save()
    .then(() => res.status(200).json("Event successfully added."))
    .catch(err => res.json("Error: " + err + "."));
})


module.exports = router;
