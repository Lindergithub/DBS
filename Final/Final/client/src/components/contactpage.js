//contactpage.js
import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function ContactPage() {
  const [contact, setContacts] = React.useState([]);
  const [selectedContact, setSelectedContact] = React.useState(null);
  const [contactName, setContactName] = React.useState('');
  const [contactPhone, setContactPhone] = React.useState('');
  const [contactEmail, setContactEmail] = React.useState('');
  const [contactAddress, setContactAddress] = React.useState('');
  const [contactLineID, setContactLineID] = React.useState('');
  //new set
  const [showModal, setShowModal] = useState(false);


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  //new set
  useEffect(() => {
    Axios.get('http://localhost:3001/api/contacts')
      .then(response => {
        setContacts(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [contact]);

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className='classcontact'>
      <div className='creat'>
        <h1>Contacts</h1>
        <button onClick={openModal}>+</button>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              {/* 输入框 */}
              <br></br>
              <input type="text" placeholder="Contact Name" id="updateInput" onChange={(event) => {
                setContactName(event.target.value);
              }} />

              <br></br>
              <input type="text" placeholder="Contact Phone" id="updateInput" onChange={(event) => {
                setContactPhone(event.target.value);
              }} />

              <br></br>
              <input type="text" placeholder="Contact Email" id="updateInput" onChange={(event) => {
                setContactEmail(event.target.value);
              }} />

              <br></br>
              <input type="text" placeholder="Contact Address" id="updateInput" onChange={(event) => {
                setContactAddress(event.target.value);
              }} />

              <br></br>
              <input type="text" placeholder="Contact Line ID" id="updateInput" onChange={(event) => {
                setContactLineID(event.target.value);
              }} />
            </div>
            <div className='addcancel'>
              <button onClick={() => {
                Axios.post('http://localhost:3001/api/contacts', {
                  contact_name: contactName,
                  contact_phone: contactPhone,
                  contact_email: contactEmail,
                  contact_address: contactAddress,
                  contact_line_id: contactLineID
                }).then(response => {
                  setContacts([...contact, response.data]);
                  closeModal();
                });
              }}>Add Contact</button>
              <br></br>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>


      <br></br>

      <table>
        <thead>
          <tr>
            <th>UI_ID</th>
            <th>UI_Name</th>
            <th>UI_Phone</th>
            <th>UI_Email</th>
            <th>UI_Address</th>
            <th>UI_Line ID</th>
            <th>UI_Edit</th>
            <th>UI_Delete</th>
          </tr>
        </thead>
        <tbody>
          {contact.map(contact => (
            <tr key={contact.contact_id}>
              <td>{contact.contact_id}</td>
              <td>{contact.contact_name}</td>
              <td>{contact.contact_phone}</td>
              <td>{contact.contact_email}</td>
              <td>{contact.contact_address}</td>
              <td>{contact.contact_line_id}</td>
              <td>
                <button onClick={() => handleEditClick(contact)}>Edit</button>
              </td>
              <td>
                <button onClick={() => {
                  Axios.delete(`http://localhost:3001/api/contacts/${contact.contact_id}`)
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedContact && (
        <div>
          <h2>Edit Contact</h2>
          <form>
            <label htmlFor="contact_name">Name:</label>
            <input type="text" id="contact_name" value={selectedContact.contact_name} onChange={(event) => {
              setSelectedContact({ ...selectedContact, contact_name: event.target.value });
            }} />
            <br></br>
            <label htmlFor="contact_phone">Phone:</label>
            <input type="text" id="contact_phone" value={selectedContact.contact_phone} onChange={(event) => {
              setSelectedContact({ ...selectedContact, contact_phone: event.target.value });
            }} />
            <br></br>
            <label htmlFor="contact_email">Email:</label>
            <input type="text" id="contact_email" value={selectedContact.contact_email} onChange={(event) => {
              setSelectedContact({ ...selectedContact, contact_email: event.target.value });
            }} />
            <br></br>
            <label htmlFor="contact_address">Address:</label>
            <input type="text" id="contact_address" value={selectedContact.contact_address} onChange={(event) => {
              setSelectedContact({ ...selectedContact, contact_address: event.target.value });
            }} />
            <br></br>
            <label htmlFor="contact_line_id">Line ID:</label>
            <input type="text" id="contact_line_id" value={selectedContact.contact_line_id} onChange={(event) => {
              setSelectedContact({ ...selectedContact, contact_line_id: event.target.value });
            }} />
            <br></br>

            <button type="submit" onClick={(event) => {
              event.preventDefault();
              Axios.put(`http://localhost:3001/api/contacts/${selectedContact.contact_id}`, {
                contact_name: selectedContact.contact_name,
                contact_phone: selectedContact.contact_phone,
                contact_email: selectedContact.contact_email,
                contact_address: selectedContact.contact_address,
                contact_line_id: selectedContact.contact_line_id
              }).then(response => {
                setContacts(contact.map(contact => {
                  if (contact.contact_id === selectedContact.contact_id) {
                    return {
                      ...contact, contact_name: selectedContact.contact_name, contact_phone: selectedContact.contact_phone
                      , contact_email: selectedContact.contact_email, contact_address: selectedContact.contact_address, contact_line_id: selectedContact.contact_line_id
                    };
                  }
                  return contact;
                }));
                setSelectedContact(null);
              });
            }}>Save</button>
            <button onClick={() => setSelectedContact(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ContactPage;