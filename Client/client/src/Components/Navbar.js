import React, { Component } from 'react'
import { Link }  from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Home</Link>
                <Link to="/signin" className="navbar-brand">Sign In</Link>
            </nav>
        )
    }
}