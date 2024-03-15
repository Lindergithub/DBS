import React from 'react';
import Axios from 'axios'; // 需要安裝 axios 庫：npm install axios
import  { useState } from 'react';
function Rentpage() {
  const readUser = () => {
    Axios.get("http://localhost:8000/api/venues").then((response) => {
      console.log(response.data);
    });
  };
  const [venueData, setVenueData] = useState({
    venue_name: '',
    venue_address: '',
    user_name: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({ ...venueData, [name]: value });
    //console.log('this',venueData )
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post('http://localhost:8000/api/venues', venueData);
      alert('Venue created successfully!');
      // 清空表單
      setVenueData({
        venue_name: '',
        venue_address: '',
        user_name: '',
      });
    } catch (error) {
      console.error('Error creating venue:', error);
      alert('Failed to create venue');
    }
  };

  return (
    <div className="Rentpage">
      <h1>Rentpage</h1>
      <div className='read'>
        <button onClick={readUser}> </button>
      </div>
      <div className='create'>
        <form onSubmit={handleSubmit}>
          
          <input
            type="text"
            name="venue_name"
            placeholder="Venue Name"
            value={venueData.venue_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="venue_address"
            placeholder="Venue Address"
            value={venueData.venue_address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="user_name"
            placeholder="user_name"
            value={venueData.user_name}
            onChange={handleChange}
          />
          <button type="submit">Create Venue</button>
        </form>
      </div>
    </div>
  );
}

export default Rentpage;
