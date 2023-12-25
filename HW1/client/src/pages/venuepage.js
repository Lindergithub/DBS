import React, { useState } from 'react';
import axios from 'axios'; // 需要安裝 axios 庫：npm install axios
const Venuepage = () => {
  const [venueData, setVenueData] = useState({
    name: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVenueData({ ...venueData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this is the venueData :", venueData)
    try {
      await axios.post('http://localhost:8000/createVenue', venueData);
      alert('Venue created successfully!');
      // 清空表單
      setVenueData({
        name: '',
        content: '',
      });
    } catch (error) {
      console.error('Error creating venue:', error);
      alert('Failed to create venue');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={venueData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="content"
        placeholder="Content"
        value={venueData.content}
        onChange={handleChange}
      />
      <button type="submit">Create Venue</button>
    </form>
  );
};

// function Venuepage() {
//   const [venueData, setVenueData] = useState({
//     venue_id: '',
//     venue_name: '',
//     venue_address: '',
//     user_id_venue: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVenueData({ ...venueData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:8000/createVenue', venueData);
//       alert('Venue created successfully!');
//       // 清空表單
//       setVenueData({
//         venue_id: '',
//         venue_name: '',
//         venue_address: '',
//         user_id_venue: '',
//       });
//     } catch (error) {
//       console.error('Error creating venue:', error);
//       alert('Failed to create venue');
//     }
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="venue_id"
//         placeholder="Venue ID"
//         value={venueData.venue_id}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="venue_name"
//         placeholder="Venue Name"
//         value={venueData.venue_name}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="venue_address"
//         placeholder="Venue Address"
//         value={venueData.venue_address}
//         onChange={handleChange}
//       />
//       <input
//         type="text"
//         name="user_id_venue"
//         placeholder="User ID Venue"
//         value={venueData.user_id_venue}
//         onChange={handleChange}
//       />
//       <button type="submit">Create Venue</button>
//     </form>
//   );
// };
export default Venuepage;
