import React, { Component } from 'react'
import EventForm from './EventForm';

const axios = require('axios');
const env = process.env.ENVIRONMENT || 'http://localhost:3000';

export default class EventDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: this.props.eventInfo,
            user: this.props.user,
            showEditEvent: false,
        }
        console.log("Entered EventDetails component", this.state);
        this.eventRegister = this.eventRegister.bind(this);
        this.showEditEvent = this.showEditEvent.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
    }

    eventRegister() {
        const url = env + '/events';
        axios({
            method: 'post',
            url: url, 
            // headers: { 
            // 'Access-Control-Allow-Origin' : '*',
            // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE',
            // },
            data: {
                eventID: this.state.event._id,
                user: this.state.user
            }
        })
            .then(() => {
                console.log("Successfully posted new event info to server.");
            })
            .catch(err => console.log("Error: ", err));

        window.location = '/';
    }

    showEditEvent(newEvent) {
        this.setState({
            showEditEvent: true
        })
    }

    deleteEvent() {
        console.log("Entered EventDetails.deleteEvent()", this.state.event);
        const url = env + '/event/delete/' + this.state.event._id;
        axios({
            method: 'delete',
            url: url
        })
        .then(() => { console.log("Successfully deleted event."); window.location = "/"; })
        .catch(err => console.log("Error deleting event: ", err));
    }

    render() {

        var registerButton = (
            <form onSubmit={this.eventRegister}>
                <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-primary" />
                </div>
            </form>
        );
        // user already registered for event

        var editButton = this.state.user === this.state.event.hostID ? (
            <button onClick={this.showEditEvent} className="btn btn-primary m-2">Edit Event</button>
        ) : "";

        console.log("EventDetails component", this.state.event.participants, this.state.user);
        if (this.state.event.participants.includes(this.state.user)) {
            registerButton = (
                <form onSubmit={this.eventRegister}>
                    <div className="form-group">
                        <input type="submit" value="Registered" className="btn btn-primary" disabled="disabled" />
                    </div>
                </form>
            );
        }

        if (this.state.showEditEvent && this.state.user === this.state.event.hostID) {
            console.log("Passing this as props to EventForm", this.state.event);
            return (
                <div>
                    <EventForm hostID={this.state.user} edit={true} editID={this.state.event._id} editEventDetails={this.state.event} />
                    <button onClick={this.deleteEvent} className="btn btn-danger">Delete</button>
                </div>
            )
        }

        return (
            <div>
                <div className="event bg-light" key={this.state.event._id}>
                    <h1 className="display-3">{this.state.event.eventName}</h1>
                    <p className="lead">At {this.state.event.location}</p>
                    <p className="lead">Ages {this.state.event.ageMin} to {this.state.event.ageMax}</p>
                    <p className="lead">Hosted by {this.state.event.hostName}</p>
                </div>

                {registerButton}
                {editButton}
            </div>
        )
    }
}
