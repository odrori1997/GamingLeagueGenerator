import React, { Component } from 'react';

require('dotenv').config();
const axios = require('axios');

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: this.props.userInfo,
            age: 18,
            location: 0
        }
        console.log("Entered UserForm component");

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        console.log("Entered onSubmit().");

        const User = {
            uuid: this.state.userInfo.uid,
            displayName: this.state.userInfo.displayName,
            age: parseInt(this.state.age),
            location: this.state.location
        };

        console.log("Passing the following userInfo to server.", User);
        
        const env = process.env.ENVIRONMENT || "http://localhost:3000/";
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

    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onChangeLocation(e) {
        this.setState({
            location: e.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <select 
                            required
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
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
