// import './App.css';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar';
// import Home from './Components/Home';
// import SignUp from './Components/SignUp';
// import firebase from 'firebase';
// import { UserContext } from './Providers/UserProvider';
// import React, {useContext} from 'react';
// import GuestHome from './Components/GuestHome';
// import UserProvider from './Providers/UserProvider';

// // Configure Firebase.
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyATcfXnQpEIXvJYMlt5yS6Ub8bqQ0AivVk',
//   authDomain: "gaming-league-20cee.firebaseapp.com",
//   projectId: "gaming-league-20cee",
//   storageBucket: "gaming-league-20cee.appspot.com",
//   messagingSenderId: "308852548797",
//   appId: "1:308852548797:web:2e0fb0ff89d4291c07c3d4",
//   measurementId: "G-6DVXN4445B"
// };
// firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();

// function App() {
//     return (
//       <div className="App">
//         <div>
//           <Router>
//             <UserProvider>
//             <Navbar />
//               <Route path = "/" component = {Home} />
//               <Route path = "/login" component = {SignUp} />
//               {/* <Route path = "/logout" component = {LogOut} /> */}
//             </UserProvider>
//           </Router>
//         </div>
//       </div>
//     );
// }

// export default App;



import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import firebase from 'firebase';
import React, { Component, createContext} from 'react';
import UserContext from './Providers/UserProvider';

// Configure Firebase.
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyATcfXnQpEIXvJYMlt5yS6Ub8bqQ0AivVk',
  authDomain: "gaming-league-20cee.firebaseapp.com",
  projectId: "gaming-league-20cee",
  storageBucket: "gaming-league-20cee.appspot.com",
  messagingSenderId: "308852548797",
  appId: "1:308852548797:web:2e0fb0ff89d4291c07c3d4",
  measurementId: "G-6DVXN4445B"
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = async () => {
    auth.onAuthStateChanged((output) => {
        const user = auth.currentUser;
        console.log("Auth state changed:",user);
        this.setState({ user });
    })
  }

  render() {
    console.log("In App", this.state.user);
    return (
      <div className="App">
        <div>
          <Router>
            <UserContext.Provider value={this.state.user}>
            <Navbar />
              <Route path = "/" exact component = {Home} />
              <Route path = "/login" component = {SignUp} />
              {/* <Route path = "/logout" component = {LogOut} /> */}
            </UserContext.Provider>
          </Router>
        </div>
      </div>
    );
  }
}



