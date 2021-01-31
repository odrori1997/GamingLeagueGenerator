import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
import firebase from 'firebase';

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

function App() {
  return (
    <div className="App">
      <div>
        <Router>
            <Navbar />
            <Route path = "/" component = {Home} />
            <Route path = "/login" component = {SignUp} />
        </Router>
      </div>
    </div>
  );
}

export default App;
