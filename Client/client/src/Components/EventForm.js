import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import TimePicker from 'react-time-picker';

require('dotenv').config();
const axios = require('axios');

export default class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: this.props.editEventDetails ? this.props.editEventDetails.eventName : "No Event Created",
            eventDate: this.props.editEventDetails ? new Date(this.props.editEventDetails.date) : new Date(),
            time: this.props.editEventDetails ? new Date(this.props.editEventDetails.date).toTimeString().substring(0, 5) : "22:00",
            ageRange: this.props.editEventDetails ? [this.props.editEventDetails.ageMin, this.props.editEventDetails.ageMax] : [18, 65],
            location: this.props.editEventDetails ? this.props.editEventDetails.location : "New York City",
            participants: this.props.editEventDetails ? this.props.editEventDetails.participants : [],
            hostID: this.props.hostID,
            hostName: this.props.hostName,
            edit: this.props.edit ? this.props.edit : false,
        }
        console.log("Entered EventForm component");

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEventName = this.onChangeEventName.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
    }

    componentDidMount() {

    }

    onSubmit(e) {
        e.preventDefault();

        console.log("Entered onSubmit().");

        const eventDate = this.state.eventDate;
        eventDate.setHours(this.state.time.split(":")[0]);
        eventDate.setMinutes(this.state.time.split(":")[1]);

        const Event = {
            eventName: this.state.eventName,
            date: eventDate,
            ageMin: this.state.ageRange[0],
            ageMax: this.state.ageRange[1],
            location: this.state.location,
            participants: this.state.participants,
            hostID: this.state.hostID,
            hostName: this.state.hostName,
            eventID: this.props.editID ? this.props.editID : "",
        };

        console.log("Passing the following eventInfo to server.", Event);
        
        const env = process.env.ENVIRONMENT || "http://localhost:3000";
        var url = this.state.edit ? env + "/event/update" : env + "/events/create";
        console.log("Hitting this URL in EventForm component", url);
        axios({
            method: 'post',
            url: url, 
            data: Event
        })
            .then(() => {
                console.log("Successfully posted new event info to server.");
            })
            .catch(err => console.log("Error: ", err));

        window.location = '/';
    }

    onChangeEventName(e) {
        console.log("In onChangeEventName()", e);
        this.setState({
            eventName: e.target.value
        });
    }

    onChangeAge(e, newValue) {
        console.log("In onChangeAge()",newValue);
        this.setState({
            ageRange: newValue
        });
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        });
    }

    onChangeDate(newValue) {
        console.log("In onChangedate()", newValue);
        this.setState({
            eventDate: newValue
        });
    }

    onChangeTime(newValue) {
        console.log("In onChangeTime()", newValue);
        this.setState({
            time: newValue
        });
    }

    render() {
        if (this.props.hostID === -1) {
            return (
                <h1 className="display-1">Please sign in to view this page.</h1>
            );
        }
        // const startDate = new Date();
        const marks = [];
        for (let mark = 18; mark <= 65; mark++) {
            marks.push({
                value: mark,
                label: ""
            });
        };

        console.log("EventForm state: ", this.state);

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="event-name">Event Name</label>
                        <input type="text" id="event-name" className="form-control" onChange={this.onChangeEventName} value={this.state.eventName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date=picker">Select a Date for your Event</label><br />
                        <DatePicker id="date-picker" selected={this.state.eventDate} onChange={this.onChangeDate} /> 
                        <TimePicker id="time-picker" className="ml-5" value={this.state.time} onChange={this.onChangeTime} 
                                amPmAriaLabel="Select AM/PM"
                                clearAriaLabel="Clear value"
                                clockAriaLabel="Toggle clock"
                                hourAriaLabel="Hour"
                                minuteAriaLabel="Minute"
                                nativeInputAriaLabel="Time"
                            />
                    </div>
                    <div className="form-group">
                        <Typography id="range-slider" gutterBottom>
                            Select Age Range
                        </Typography>
                        <Slider
                            value={this.state.ageRange}
                            onChange={this.onChangeAge}
                            valueLabelDisplay="on"
                            aria-labelledby="range-slider"
                            marks={marks}
                            step={null}
                        />

                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <select 
                            required
                            id="location"
                            className="form-control"
                            value={this.state.location}
                            onChange={this.onChangeLocation}
                            >
                                <option 
                                    key={0}
                                    value={"New York City"}>New York City</option>
                                <option 
                                    key={1}
                                    value={"Philadelphia"}>Philadelphia</option>
                                <option 
                                    key={2}
                                    value={"Boston"}>Boston</option>
                                <option 
                                    key={3}
                                    value={"Jersey City"}>Jersey City</option>
                                <option 
                                    key={4}
                                    value={"Hoboken"}>Hoboken</option>
                                <option 
                                    key={5}
                                    value={"Other"}>Other</option>
                            </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Done" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
