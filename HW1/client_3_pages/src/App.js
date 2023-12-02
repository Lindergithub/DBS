import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Homepage from "./homepage";
import Userpage from "./userpage";
import Rentpage from "./rentpage";
import Venuepage from "./venuepage";

function App() {

  return (
    <>
      <Router>
        <Link to="/">Go To The Home Page</Link>
        <Link to="/user">Go To The User Page</Link>
        <Link to="/rent">Go To The Rent Page</Link>
        <Link to="/venue">Go To The Venue Page</Link>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/user" element={<Userpage />} />
          <Route path="/rent" element={<Rentpage />} />
          <Route path="/venue" element={<Venuepage />} />
        </Routes>
      </Router>

    </>
  );
}


export default App;
