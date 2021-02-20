import React, { Component } from 'react';
import { logInFromServer } from '../App';

require('dotenv').config();
const axios = require('axios');

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo,
            setUser: this.props.setUser,
            age: 18,
            location: "Not Created"
        }
        console.log("Entered UserForm component", this.state);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        console.log("Entered onSubmit().");

        const User = {
            uid: this.state.userInfo.uid,
            displayName: this.state.userInfo.displayName,
            email: this.state.userInfo.email,
            age: parseInt(this.state.age),
            location: this.state.location
        };

        console.log("Passing the following userInfo to server.", User);
        
        const env = process.env.ENVIRONMENT || "http://localhost:3000/addUser";
        axios({
            method: 'post',
            url: env, 
            // headers: { 
            // 'Access-Control-Allow-Origin' : '*',
            // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE',
            // },
            data: User
        })
            .then(() => {
                console.log("Successfully posted new user info to server.");
            })
            .catch(err => console.log("Error: ", err));

        // console.log("this.state.setUser: ", this.state.setUser);
        // console.log("this.state:", this.state);
        this.state.setUser(User);
        if (this.props.setEdit) {
            this.props.setEdit(false);
        }
        // window.location = '/';
    }

    onChangeAge(e) {
        console.log("Entered onChangeAge", e.target.value);
        this.setState({
            age: e.target.value
        });
    }

    onChangeLocation(e) {
        console.log("Entered onChangeLocation", e.target.value);
        this.setState({
            location: e.target.value
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <select 
                            required
                            id="age"
                            className="form-control"
                            value={this.state.age}
                            onChange={this.onChangeAge}
                            >
                                <option 
                                    key={18}
                                    value={18}>18</option>
                                <option 
                                    key={19}
                                    value={19}>19</option>
                                <option 
                                    key={20}
                                    value={20}>20</option>
                                <option 
                                    key={21}
                                    value={21}>21</option>
                                <option 
                                    key={22}
                                    value={22}>22</option>
                                <option 
                                    key={23}
                                    value={23}>23</option>
                                <option 
                                    key={24}
                                    value={24}>24</option>
                                <option 
                                    key={25}
                                    value={25}>25</option>
                            </select>
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
                        <input type="submit" value="Submit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
