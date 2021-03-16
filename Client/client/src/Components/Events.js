import React, { Component } from 'react'
import EventForm from './EventForm'
import { Redirect } from 'react-router-dom';
import EventDetails from './EventDetails';

const axios = require('axios');

export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            showEventForm: false,
            showEventDetails: false,
            currentEvent: null
        }
        this.populateEvents = this.populateEvents.bind(this);
        this.createEvent = this.createEvent.bind(this);
        this.showEventDetails = this.showEventDetails.bind(this);
    }

    componentDidMount() {
        this.populateEvents();
    }

    createEvent() {
        this.setState({
            showEventForm: true
        })
    }

    populateEvents() {
        console.log("Entered populateEvents()");
        const url = 'http://localhost:3000/events/' + this.props.user.location + "/" + this.props.user.age;
        axios({
            method: 'get',
            url: url
        })
        .then(res => { console.log("Fetching events from Mongodb...", res); this.setState({events: res}); })
        .catch(err => console.log("Error: ", err));
    }

    showEventDetails(event) {
        console.log("Entered showEventDetails()", event);
        this.setState({
            currentEvent: event,
            showEventDetails: true
        })
    }

    render() {
        const currUserID = this.props.user ? this.props.user.uid : -1;
        if (this.state.showEventForm) {
            return <EventForm hostID={currUserID} hostName={this.props.user.displayName} />
        }
        console.log("Entered Events", this.state.events);
        if (this.state.showEventDetails && this.state.currentEvent) {
            return (
                <EventDetails eventInfo={this.state.currentEvent} user={currUserID} />
            )
        }
        if (this.state.events.data) {
            return (
                <div className="calendar">
                    <h1 className="display-2">Upcoming Events</h1>
                    <button type="button" className="btn btn-secondary m-2" onClick={this.createEvent}>Create Event</button>
                    <div className="row justify-content">
                    {
                        this.state.events.data.map(event => {
                            return (  
                                <div
                                    onClick={() => this.showEventDetails(event)}
                                    className="card m-4 col-3"
                                    style={{width: "18rem"}}
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
                    }
                    </div>
                </div>
            )
        }
        return (
            <div className="calendar">
                <h1 className="display-2">No Events.</h1>
            </div>
        )
    }
}