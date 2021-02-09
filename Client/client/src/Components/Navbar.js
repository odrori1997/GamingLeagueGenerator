import React, { Component } from 'react'
import { Link }  from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        const LoggedIn = this.props.user && this.props.user.uid;
        const SignInText = LoggedIn ? "Log Out" : "Log In";
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Home</Link>
                <Link to="/login" className="navbar-brand" id="login-status">{SignInText}</Link>
            </nav>
            
        )
    }
}