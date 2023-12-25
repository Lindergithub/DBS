import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Bar from "./bar";
import Userpage from "./userpage";
import Rentpage from "./rentpage";
import Venuepage from "./venuepage";
function Homepage() {

  return (
    <>
      <Bar></Bar>
      <Routes>
        <Route path="/user" element={<Userpage />} />
        <Route path="/rent" element={<Rentpage />} />
        <Route path="/venue" element={<Venuepage />} />
      </Routes>
    </>
  );
}

export default Homepage;
