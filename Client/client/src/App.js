import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import SignUp from './Components/SignUp';
import firebase from 'firebase';



function App() {
  return (
    <div className="App">
      <div>
        <Router>
            <Navbar />
            <Route path = "/" component = {Home} />
            <Route path = "/signin" component = {SignUp} />
        </Router>
      </div>
    </div>
  );
}

export default App;
