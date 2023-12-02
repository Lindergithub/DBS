
/*
import React from 'react';
function Userpage() {
    console.log('this is Userpage');
  return (
    <div className="Userpage">
      <h1>Userpage</h1>
    </div>
  );
}
export default Userpage;
*/
import React, { useState, useEffect } from 'react';

import Axios from 'axios';

function Userpage() {
  console.log('hi, this is userpage')

  const [frontinputname, setFIname] = useState('');
  const [frontinputgender, setFIgender] = useState('');
  const [frontinputphone, setFIphone] = useState('');
  const [frontinputemail, setFIemail] = useState('');
  const [userlist, setUserlist] = useState([]);
  const [updateNameMap, setUpdateNameMap] = useState({});

  const storeName = event => { setFIname(event.target.value) };
  const storeGender = event => { setFIgender(event.target.value) };
  const storePhone = event => { setFIphone(event.target.value) };
  const storeEmail = event => { setFIemail(event.target.value) };

  const clearInput = () => {
    setFIname('');
    setFIgender('');
    setFIphone('');
    setFIemail('');
  };

  const clearInputnewName = () => {
    setUpdateNameMap('');
  };

  useEffect(() => {
    console.log('Latest updateNameMap:', updateNameMap);
  }, [updateNameMap]);

  const createUser = () => {
    if (isNaN(frontinputphone)) {
      alert("電話請輸入數字");
      return;
    }
    Axios.post("http://localhost:3001/createuser", {
      sendtobackname: frontinputname,
      sendtobackgender: frontinputgender,
      sendtobackphone: frontinputphone,
      sendtobackemail: frontinputemail,
    }).then((response) => {
      setUserlist([
        ...userlist,
        {
          user_id: response.data.insertId,
          user_name: frontinputname,
          user_gender: frontinputgender,
          user_phone: frontinputphone,
          user_email: frontinputemail,
        },
      ]);

      setUpdateNameMap((prevMap) => ({
        ...prevMap,
        [response.data.insertId]: '',
      }));
    });
  };

  const readUser = () => {
    Axios.get("http://localhost:3001/readuser").then((response) => {
      setUserlist(response.data);
    });
  };

  const updateUserName = (userId, newfrontinputname) => {
    if (newfrontinputname !== "") {
      Axios.put("http://localhost:3001/update", {
        sendtobackname: newfrontinputname,
        Id: userId,
      }).then((response) => {
        setUserlist(
          userlist.map((val) =>
            val.user_id === userId
              ? {
                user_id: val.user_id,
                user_name: newfrontinputname,
                user_gender: val.user_gender,
                user_phone: val.user_phone,
                user_email: val.user_email,
              }
              : val
          )
        );
      });
    } else {
      console.log("輸入匡為空，不進行更新操作");
    }
  };

  const deleteUser = (userId) => {
    Axios.delete(`http://localhost:3001/delete/${userId}`).then((response) => {
      setUserlist(
        userlist.filter((val) => {
          return val.user_id !== userId;
        })
      );
    });
  };

  const handleUpdateSubmit = (event, userId) => {
    event.preventDefault();
    const newfrontinputname = updateNameMap[userId] || '';
    updateUserName(userId, newfrontinputname);
    clearInputnewName();
  };

  return (

    <div className="UserPage">
      <div className="adduser">
        <label>Name:</label>
        <input type="text" onChange={storeName} value={frontinputname} />
        <label>Gender:</label>
        <input type="text" onChange={storeGender} value={frontinputgender} />
        <label>Phone:</label>
        <input type="text" onChange={storePhone} value={frontinputphone} />
        <label>Email:</label>
        <input type="text" onChange={storeEmail} value={frontinputemail} />

        <button onClick={() => { createUser(); clearInput(); }}>Add User</button>
      </div>

      <div className="showusers">
        <button onClick={readUser}>Show User</button>
        {userlist.map((val, key) => (
          <div className="showuser" key={key}>
            <div>
              <h3>Id: {val.user_id}</h3>
              <h3>Name: {val.user_name}</h3>
              <h3>Gender: {val.user_gender}</h3>
              <h3>Phone: {val.user_phone}</h3>
              <h3>Email: {val.user_email}</h3>
            </div>
            <div>
              <form onSubmit={(event) => handleUpdateSubmit(event, val.user_id)}>
                <input
                  id={`frontinputname-${val.user_id}`}
                  name={`frontinputname-${val.user_id}`}
                  type="text"
                  onChange={(event) => {
                    setUpdateNameMap((prevMap) => ({
                      ...prevMap,
                      [val.user_id]: event.target.value,
                    }));
                  }}
                  value={updateNameMap[val.user_id] || ''}
                />
                <button type="submit">Submit Update</button>
              </form>
              <button onClick={() => { deleteUser(val.user_id); }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Userpage;
