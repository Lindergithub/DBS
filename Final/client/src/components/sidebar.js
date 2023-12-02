import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/tours">Tour</Link></li>
        <li><Link to="/contacts">Contact Person</Link></li>
        <li><Link to="/travelers">Traveler</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;