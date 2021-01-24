import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'

function App() {
  return (
    <div className="App">
      <div>
        <Router>
            <Navbar />
            <Route path = "/" component = {Home} />
        </Router>
      </div>
    </div>
  );
}

export default App;
