import React, { useEffect } from 'react';
import Axios from 'axios';

function Traveler() {
  const [traveler, setTravelers] = React.useState([]);
  const [selectedTraveler, setSelectedTraveler] = React.useState(null);
  const [travelerName, setTravelerName] = React.useState('');
  const [travelerBirth, setTravelerBirth] = React.useState('');
  const [travelerIdNumber, setTravelerIdNumber] = React.useState('');
  const [travelerGender, setTravelerGender] = React.useState('');
  const [travelerDietHabits, setTravelerDietHabits] = React.useState('');

  useEffect(() => {
    Axios.get('http://localhost:3001/api/tours')
      .then(response => {
        setTravelers(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [traveler]);

  const handleEditClick = (traveler) => {
    setSelectedTraveler(traveler);
  };

  return (
    <div className='classtraveler'>
      <div className='creat'>
        <h1>Travelers</h1>
        <button onClick={() => {
          Axios.post('http://localhost:3001/api/travelers', {
            traveler_name: travelerName,
            traveler_birth: travelerBirth,
            traveler_id_number: travelerIdNumber,
            traveler_gender: travelerGender,
            traveler_diet_habits: travelerDietHabits
          }).then(response => {
            setTravelers([...traveler, response.data]);
          });
        }}>+</button>

        <br></br>
        <input type="text" placeholder="Traveler Name" id="updateInput" onChange={(event) => {
          setTravelerName(event.target.value);
        }} />

        <br></br>
        <input type="text" placeholder="Traveler Birth" id="updateInput" onChange={(event) => {
          setTravelerBirth(event.target.value);
        }} />

        <br></br>
        <input type="text" placeholder="Traveler Id Number" id="updateInput" onChange={(event) => {
          setTravelerIdNumber(event.target.value);
        }} />

        <br></br>
        <input type="text" placeholder="Traveler Gender" id="updateInput" onChange={(event) => {
          setTravelerGender(event.target.value);
        }} />

        <br></br>
        <input type="text" placeholder="Traveler Diet Habits" id="updateInput" onChange={(event) => {
          setTravelerDietHabits(event.target.value);
        }} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Birth</th>
            <th>Id Number</th>
            <th>Gender</th>
            <th>Diet Habits</th>
            <th>Tour ID</th>
            <th>Contact ID</th>
          </tr>
        </thead>
        <tbody>
          {traveler.map(traveler => (
            <tr key={traveler.traveler_id}>
              <td>{traveler.traveler_id}</td>
              <td>{traveler.traveler_name}</td>
              <td>{new Date(traveler.traveler_birth).toLocaleString('en-US', { timeZone: 'Asia/Taipei', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '').replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')}</td>
              <td>{traveler.traveler_id_number}</td>
              <td>{traveler.traveler_gender}</td>
              <td>{traveler.traveler_diet_habits}</td>
              <td>{traveler.tour_id}</td>
              <td>{traveler.contact_id}</td>
              <td>
                <button onClick={() => handleEditClick(traveler)}>Edit</button>
              </td>
              <td>
                <button onClick={() => {
                  Axios.delete(`http://localhost:3001/api/tours/${traveler.traveler_id}`)
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTraveler && (
        <div>
          <h2>Edit Tour</h2>
          <form>
            <label htmlFor="traveler_name">Name:</label>
            <input type="text" id="traveler_name" value={selectedTraveler.traveler_name} onChange={(event) => {
              setSelectedTraveler({ ...selectedTraveler, traveler_name: event.target.value });
            }} />
            <br></br>
            <label htmlFor="traveler_birth">Birth:</label>
            <input type="text" id="traveler_birth" value={selectedTraveler.traveler_birth} onChange={(event) => {
              setSelectedTraveler({ ...selectedTraveler, traveler_birth: event.target.value });
            }} />
            <br></br>
            <label htmlFor="traveler_id_number">Id Number:</label>
            <input type="text" id="traveler_id_number" value={selectedTraveler.traveler_id_number} onChange={(event) => {
              setSelectedTraveler({ ...selectedTraveler, traveler_id_number: event.target.value });
            }} />
            <br></br>
            <label htmlFor="traveler_gender">Gender:</label>
            <input type="text" id="traveler_gender" value={selectedTraveler.traveler_gender} onChange={(event) => {
              setSelectedTraveler({ ...selectedTraveler, traveler_gender: event.target.value });
            }} />
            <br></br>
            <label htmlFor="traveler_diet_habits">Diet Habits:</label>
            <input type="text" id="traveler_diet_habits" value={selectedTraveler.traveler_diet_habits} onChange={(event) => {
              setSelectedTraveler({ ...selectedTraveler, traveler_diet_habits: event.target.value });
            }} />
            <br></br>

            <button type="submit" onClick={(event) => {
              event.preventDefault();
              Axios.put(`http://localhost:3001/api/travelers/${selectedTraveler.traveler_id}`, {
                traveler_name: selectedTraveler.traveler_name,
                traveler_birth: selectedTraveler.traveler_birth,
                traveler_id_number: selectedTraveler.traveler_id_number,
                traveler_gender: selectedTraveler.traveler_gender,
                traveler_diet_habits: selectedTraveler.traveler_diet_habits
              }).then(response => {
                setTravelers(traveler.map(traveler => {
                  if (traveler.traveler_id === selectedTraveler.traveler_id) {
                    return {
                      ...traveler, traveler_name: selectedTraveler.traveler_name, traveler_birth: selectedTraveler.traveler_birth
                      , traveler_id_number: selectedTraveler.traveler_id_number, traveler_gender: selectedTraveler.traveler_gender
                      , traveler_diet_habits: selectedTraveler.traveler_diet_habits
                    };
                  }
                  return traveler;
                }));
                setSelectedTraveler(null);
              });
            }}>Save</button>
            <button onClick={() => setSelectedTraveler(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Traveler;