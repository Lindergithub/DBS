import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Userpage from "./pages/userpage";
import Rentpage from "./pages/rentpage";
import Venuepage from "./pages/venuepage";
import Homepage from "./pages/homepage";
import Loginpage from "./pages/loginpage";

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/home" element={<Homepage />} >
            <Route path="user" element={<Userpage />} />
            <Route path="rent" element={<Rentpage />} />
            <Route path="venue" element={<Venuepage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );

}


export default App;
