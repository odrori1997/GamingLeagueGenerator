const firebase = require('firebase');
var cors = require('cors');
const mongoose = require('mongoose');

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
      console.log("Creating MongoDB Events query");
      Event.find({ageMin: { $lt: age }, ageMax: { $gt: age }, location: location}, function(err, docs) {
        if (err) {
          console.log("Error:", err);
          return;
        }
        console.log("Result of MongoDB Events Query:", docs);
        res.json(docs);
      });
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

/* POST User age + location. If user already exists, update with new info. */
router.post('/addUser', async (req, res, next) => {

  console.log("Entered createUser()", req.body);
  let email = req.body.email;
  let uid = req.body.uid;
  let location = req.body.location;
  let age = req.body.age;
  let displayName = req.body.displayName;

  let userExists = await User.findOne({ uid: uid });

  if (userExists) {
    userExists.email = email;
    userExists.location = location;
    userExists.age = age;
    userExists.displayName = displayName;

    userExists.save((err) => {
      if (err) {
        console.error("Error updating User: ", err);
      }
    });
    
  }
  else {
    const newUser = new User({
      displayName: displayName,
      uid: uid,
      email: email,
      location: location,
      age: age,
    });
  
    newUser.save(function(err) {
      if (err) {
        console.log(err);
        return;
      }
    });
  }
    res.json("User successfully added.");
});

/* DELETE User. */
router.delete('/deleteUser', (req, res, next) => {

  console.log("Entered deleteUser()", req.body);
  
  let uid = req.body.uid;

  User.deleteOne({ uid: uid }, function(err) {
    if (err) {
      console.log(err);
      return;
    }
    res.json("User successfully deleted.");
  });
});

/* POST User registering for an event. */
router.post('/events', async (req, res, next) => {
  console.log("Entered registerUserForEvent()");
  let eventID = req.body.eventID;
  let user = req.body.user;

  if (!eventID) {
    console.error("Invalid eventID.");
    return;
  }
  if (!user) {
    console.error("Invalid userID.");
    return;
  }

  // user = user.uid; // convert string to mongoose objectID
  eventID = mongoose.Types.ObjectId(eventID);

  // let event = await Event.findOne({"_id": eventID});
  // let participants = event.participants.push(user);

  // console.log("Event:", event);
  // console.log("Participants:", participants);
  console.log("User:", user);

  let event = await Event.findById(eventID);

  if (event.participants.includes(user)) {
    console.log("User already registered.");
    return;
  }

  Event.findByIdAndUpdate(eventID, 
    { "$push": {"participants": user}},
    function(err) {
      if (err) {
        console.log(err);
        return;
      }
      res.json("User successfully registered.");
    })
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
  let hostName = req.body.hostName;

  const newEvent = new Event({
    eventName: eventName,
    date: date,
    ageMin: ageMin,
    ageMax: ageMax,
    location: location,
    participants: participants,
    hostID: hostID,
    hostName: hostName
  });

  newEvent.save()
    .then(() => res.status(200).json("Event successfully added."))
    .catch(err => res.json("Error: " + err + "."));
})

/* POST updating an event. */
router.post('/event/update', (req, res, next) => {
  console.log("Entered updateEvent()", req.body);
  let eventID = req.body.eventID;
  let eventName = req.body.eventName;
  let date = req.body.date;
  let ageMin = req.body.ageMin;
  let ageMax = req.body.ageMax;
  let location = req.body.location;
  let participants = req.body.participants;
  Event.findByIdAndUpdate(eventID, 
    { 
      eventName: eventName,
      date: date,
      ageMin: ageMin,
      ageMax: ageMax,
      location: location,
      participants: participants,
    })
    .then(() => res.status(200).json("Successfully updated event."))
    .catch(err => res.json("Error: ", err));
})

/* GET all events a user is registered for. */
router.get('/user/events/:id', async (req, res, next) => {
  console.log("Entered getUserEvents()", req.params);
  let userID = req.params.id;
  let events = await Event.find({ participants: userID }, (err) => {
    if (err) {
      console.error("Error returning events for given user ID", err);
      return;
    }
  });

  res.json(events);
})


/* GET all events a user is hosting. */
router.get('/user/events/host/:id', async (req, res, next) => {
  console.log("Entered getUserHostEvents()", req.params);
  let userID = req.params.id;
  let events = await Event.find({ hostID: userID }, (err, docs) => {
    if (err) {
      console.error("Error returning events for given host ID", err);
      return;
    }
    console.log("Result of MongoDB Events Query:", docs);
  });

  res.json(events);
})

/* DELETE an event. */
router.delete('/event/delete/:id', (req, res, next) => {
  console.log("Entered deleteEvent()", req.params);
  let eventID = req.params.id;
  Event.findByIdAndDelete(eventID, err => {
    if (err) {
      console.error("Error: ", err);
    }
    res.json("Successfully deleted event.");
  })
})


module.exports = router;
