import { Button } from 'bootstrap'
import React, { Component } from 'react'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        };
        this.SignUp = this.SignUp.bind(this);
        this.SignIn = this.SignIn.bind(this);
    }

    SignUp() {
        console.log("Called SignUp");
    }

    SignIn() {
        console.log("Called SignIn");
    }


    render() {
        return (
            <div className="bg-light">
                <h1 className="display-1">Hi I'm Omer, and this is my Gaming League Generator. Sign up to pair up with people your age and in your location!</h1>
            </div>
        )
    }
}