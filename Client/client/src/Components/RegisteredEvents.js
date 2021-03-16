import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../Providers/UserProvider'
import EventDetails from './EventDetails'
const axios = require('axios');

function RegisteredEvents() {
    console.log("Entered RegisteredEvents component");
    const user = useContext(UserContext).user;
    const [ events, setEvents ] = useState([]);
    const [ hostingEvents, setHostingEvents ] = useState([]);
    const [ loaded, setLoaded ] = useState(false);
    const [ showDetails, setShowDetails ] = useState(false);
    const [ currentEvent, setCurrentEvent ] = useState(null);

    useEffect(async () => {
        if (!loaded && user) {
            console.log("Populating registered events for user ", user);
            const env = process.env.ENVIRONMENT || "http://localhost:3000/";
            var url = env + "/user/events/" + user.uid;
            let eventsRes = await axios({
                method: 'get',
                url: url, 
            });
            url = env + "/user/events/host/" + user.uid;
            let eventsHostRes = await axios({
                method: 'get',
                url: url, 
            });
            console.log("Results of MongoDB registeredEvents query", eventsRes);
            console.log("Results of MongoDB hostedEvents query", eventsHostRes);
            console.log("Setting events to ", eventsRes.data);
            if (eventsRes) {
                setEvents(eventsRes.data);
                if (eventsHostRes) {
                    setHostingEvents(eventsHostRes.data);
                }
                setLoaded(true);
            }
        }
    })

    function showEventDetails(event) {
        setCurrentEvent(event);
        setShowDetails(true);
    }

    function hideEventDetails() {
        setCurrentEvent(null);
        setShowDetails(false);
    }

    function loadRegisteredEvents() {
        if (events.length === 0) {
            return (
                <div>
                    <div className="col-6"></div>
                    <p className="lead m-5 center-text">None</p>
                </div>
            )
        }
        else {
            return (
                events.filter(event => {
                    return !hostingEvents.includes(event);
                }).map(event => {
                    return (
                        <div
                            onClick={() => showEventDetails(event)}
                            className="card m-4 col-3"
                            >
                            <div className="card-body" key={event._id}>
                                <h1 className="card-title">{event.eventName}</h1>
                                <p className="card-text"><b>Location: </b> {event.location}
                                <br />
                                <b>Age: </b>{event.ageMin} to {event.ageMax}
                                <br />
                                <b>Host: </b> {event.hostName}
                                <br />
                                {event.participants.length > 0 ? event.participants.length : "No one"} attending.</p>
                            </div>
                        </div>
                    )
                })
            )
        }
    }

    if (showDetails && currentEvent) {
        return (
            <div>
                <EventDetails eventInfo={currentEvent} user={user.uid} />
                <button onClick={hideEventDetails} className="btn btn-primary">Go Back</button>
            </div>
        )
    }
    if (events) {
        var hostEventsHTML = <h1 className="display-2">You are not hosting any events.</h1>
        if (hostingEvents.length > 0) {
            console.log("Populating hostingEventsHTML", hostingEvents);
            hostEventsHTML = (
                <div>
                    <h1 className="display-2">Events You're Hosting</h1>
                    <div className="row justify-content">
                    {
                        hostingEvents.map(event => {
                            return (
                                <div
                                    onClick={() => showEventDetails(event)}
                                    className="card m-4 col-3"
                                    >
                                    <div className="card-body" key={event._id}>
                                        <h1 className="card-title">{event.eventName}</h1>
                                        <p className="card-body">At {event.location}</p>
                                        <p className="card-body">Ages {event.ageMin} to {event.ageMax}</p>
                                        <p className="card-body">Hosted by {event.hostName}</p>
                                        <p className="card-body">With {event.participants.length > 0 ? event.participants : "no one"} attending.</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            );
        }

        return (
            <div className="row justify-content">
                {hostEventsHTML}
                <h1 className="display-2">Events You're Registered For</h1>
                <div className="row justify-content">
                {
                    loadRegisteredEvents()
                }
                </div>
            </div>
        )
    }
    return (
        <div className="">
            <h1 className="display-1">You are not registered for or hosting any events.</h1>
        </div>
    )
    
}

export default RegisteredEvents;