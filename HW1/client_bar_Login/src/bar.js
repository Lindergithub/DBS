import React from 'react';
import { useNavigate } from 'react-router-dom';
function Bar() {
  const navigate = useNavigate();


  const userNavigate = () => {
    navigate('/home/user');
  };

  const rentNavigate = () => {
    navigate('/home/rent');
  };

  const venueNavigate = () => {
    navigate('/home/venue');
  };

  return (
    <div>
      <button onClick={userNavigate}>Go To The User Page</button>
      <button onClick={rentNavigate}>Go To The Rent Page</button>
      <button onClick={venueNavigate}>Go To The Venue Page</button>
    </div>
  );
}

export default Bar;
