import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ModalForm from './modalform.js';

function TourPage() {
  const [tour, setTours] = React.useState([]);
  const [selectedTour, setSelectedTour] = React.useState(null);
  // const [tourName, setTourName] = React.useState('');
  // const [tourLocation, setTourLocation] = React.useState('');
  // const [tourDepartureDate, setTourDepartureDate] = React.useState('');
  // const [tourDeparturePlace, setTourDeparturePlace] = React.useState('');
  // const [tourMinSize, setTourMinSize] = React.useState('');
  // const [tourPrice, setTourPrice] = React.useState('');
  // const [tourDays, setTourDays] = React.useState('');
  // const [tourStatus, setTourStatus] = React.useState('');

  const [showModal, setShowModal] = useState(false);
  //
  const [fields, setFields] = useState({
    tourName: '',
    tourLocation: '',
    tourDepartureDate: '',
    tourDeparturePlace: '',
    tourMinSize: '',
    tourPrice: '',
    tourDays: '',
    tourStatus: '',
  });
  //
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  // const handleSubmit = () => {
  //   Axios.post('http://localhost:3001/api/tours', fields).then((response) => {
  //     setTours([...tour, response.data]);
  //     closeModal();
  //   });
  // };
  const handleSubmit = () => {
  Axios.post('http://localhost:3001/api/tours', {
    tour_name: fields.tourName, // Make sure to set tour_name here
    tour_location: fields.tourLocation,
    tour_departure_date: fields.tourDepartureDate,
    tour_departure_place: fields.tourDeparturePlace,
    tour_min_size: fields.tourMinSize,
    tour_price: fields.tourPrice,
    tour_days: fields.tourDays,
    tour_status: fields.tourStatus,
  }).then((response) => {
    setTours([...tour, response.data]);
    closeModal();
  }).catch((error) => {
    // Handle error
    console.error(error);
  });
};      


  useEffect(() => {
    Axios.get('http://localhost:3001/api/tours')
      .then(response => {
        setTours(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [tour]);

  const handleEditClick = (tour) => {
    setSelectedTour(tour);
  };

  return (
    <div className='classtour'>
      <div className='creat'>
        <h1>Tours</h1>
        <button onClick={openModal}>+</button>

        <ModalForm
          showModal={showModal}
          closeModal={closeModal}
          onSubmit={handleSubmit}
          fields={fields}
          setFields={setFields}
          title="Add Tour"
          buttonText="Add Tour"
        />
      </div>

      <br></br>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Departure Date</th>
            <th>Departure Place</th>
            <th>Min Size</th>
            <th>Price</th>
            <th>Days</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tour.map(tour => (
            <tr key={tour.tour_id}>
              <td>{tour.tour_id}</td>
              <td>{tour.tour_name}</td>
              <td>{tour.tour_location}</td>
              <td>{tour.tour_departure_date}</td>
              <td>{tour.tour_departure_place}</td>
              <td>{tour.tour_min_size}</td>
              <td>{tour.tour_price}</td>
              <td>{tour.tour_days}</td>
              <td>{tour.tour_status}</td>
              <td>
                <button onClick={() => handleEditClick(tour)}>Edit</button>
              </td>
              <td>
                <button onClick={() => {
                  Axios.delete(`http://localhost:3001/api/tours/${tour.tour_id}`)
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTour && (
        <div>
          <h2>Edit Tour</h2>
          <form>
            <label htmlFor="tour_name">Name:</label>
            <input type="text" id="tour_name" value={selectedTour.tour_name} onChange={(event) => {
              setSelectedTour({ ...selectedTour, tour_name: event.target.value });
            }} />
            <br></br>
            <label htmlFor="tour_location">Location:</label>
            <input type="text" id="tour_location" value={selectedTour.tour_location} onChange={(event) => {
              setSelectedTour({ ...selectedTour, tour_location: event.target.value });
            }} />
            <br></br>
            <label htmlFor="tour_departure_date">Departure Date:</label>
            <input type="text" id="tour_departure_date" value={selectedTour.tour_departure_date} onChange={(event) => {
              setSelectedTour({ ...selectedTour, tour_departure_date: event.target.value });
            }} />
            <br></br>
            <label htmlFor="tour_departure_place">Departure Place:</label>
            <input type="text" id="tour_departure_place" value={selectedTour.tour_departure_place} onChange={(event) => {
              setSelectedTour({ ...selectedTour, tour_departure_place: event.target.value });
            }} />
            <br></br>
            <label htmlFor="tour_min_size">Tour Min Size:</label>
            <input type="text" id="tour_min_size" value={selectedTour.tour_min_size} onChange={(event) => {
              setSelectedTour({ ...selectedTour, tour_min_size: event.target.value });
            }} />
            <br></br>
            <label htmlFor="tour_price">Departure Price:</label>
            <input type="text" id="tour_price" value={selectedTour.tour_price} onChange={(event) => {
              setSelectedTour({ ...selectedTour, tour_price: event.target.value });
            }} />
            <br></br>
            <label htmlFor="tour_days">Days:</label>
            <input type="text" id="tour_days" value={selectedTour.tour_days} onChange={(event) => {
              setSelectedTour({ ...selectedTour, tour_days: event.target.value });
            }} />
            <br></br>
            <label htmlFor="tour_status">Status:</label>
            <input type="text" id="tour_status" value={selectedTour.tour_status} onChange={(event) => {
              setSelectedTour({ ...selectedTour, tour_status: event.target.value });
            }} />
            <br></br>

            <button type="submit" onClick={(event) => {
              event.preventDefault();
              Axios.put(`http://localhost:3001/api/tours/${selectedTour.tour_id}`, {
                tour_name: selectedTour.tour_name,
                tour_location: selectedTour.tour_location,
                tour_departure_date: selectedTour.tour_departure_date,
                tour_departure_place: selectedTour.tour_departure_place,
                tour_min_size: selectedTour.tour_min_size,
                tour_price: selectedTour.tour_price,
                tour_days: selectedTour.tour_days,
                tour_status: selectedTour.tour_status
              }).then(response => {
                setTours(tour.map(tour => {
                  if (tour.tour_id === selectedTour.tour_id) {
                    return {
                      ...tour, tour_name: selectedTour.tour_name, tour_location: selectedTour.tour_location
                      , tour_departure_date: selectedTour.tour_departure_date, tour_departure_place: selectedTour.tour_departure_place
                      , tour_min_size: selectedTour.tour_min_size, tour_price: selectedTour.tour_price, tour_days: selectedTour.tour_days, tour_status: selectedTour.tour_status
                    };
                  }
                  return tour;
                }));
                setSelectedTour(null);
              });
            }}>Save</button>
            <button onClick={() => setSelectedTour(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TourPage;