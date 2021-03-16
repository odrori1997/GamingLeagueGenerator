import React, { Component, createContext } from 'react'
import firebase from 'firebase'
import { auth } from '../App';

const UserContext = createContext({
    user: null,
    setUser: () => {}
});

export default UserContext;

// export default class UserProvider extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             user: null
//         }
//     }

//     componentDidMount = async () => {
//         auth.onAuthStateChanged((output) => {
//             const user = auth.currentUser;
//             console.log("Auth state changed:",user);
//             this.setState({ user });
//         })
//     }
//     render() {
//         const { user } = this.state;
//         var displayName = user ? user.displayName : "";
//         console.log("Rendering UserProvider", displayName);

//         return (
//             <UserContext.Provider value={displayName}>
//                 {this.props.children}
//             </UserContext.Provider>
//         )
//     }
// }
