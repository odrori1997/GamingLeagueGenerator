import React, { Component } from 'react'
import { Link }  from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        const LoggedIn = this.props.user && this.props.user.uid;
        const SignInText = LoggedIn ? "Log Out" : "Log In";
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Home</Link>
                {LoggedIn ? <Link to="/user/profile" className="navbar-brand">Profile</Link> : ""}
                {LoggedIn ? <Link to="/user/events" className="navbar-brand">Your Events</Link> : ""}
                <Link to="/login" className="navbar-brand" id="login-status">{SignInText}</Link>
                <div className="row">
                    <div className="col-10"></div>
                    <div className="col-2">
                        <h3 className="text-right navbar-brand">{LoggedIn ? "You're logged in as " + this.props.user.displayName + "." : "You're not logged in."}</h3>
                    </div>
                </div>
            </nav>
            
        )
    }
}