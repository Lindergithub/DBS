import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import FormInput from './FormInput';
import UserCard from './UserCard';

function App1() {
    const [frontinputname, setFIname] = useState('');
    const [frontinputgender, setFIgender] = useState('');
    const [frontinputphone, setFIphone] = useState(0);
    const [frontinputemail, setFIemail] = useState('');
  
    const storeName = event => {setFIname(event.target.value)};
    const storeGender = event => {setFIgender(event.target.value)};
    const storePhone = event => {setFIphone(event.target.value)};
    const storeEmail = event => {setFIemail(event.target.value)};
    const clearInput =() =>{
      setFIname('');
      setFIgender('');
      setFIphone('');
      setFIemail('');
    };
    const clearInputnewName = () => {
      setUpdateNameMap('');
    };
    
    const [userlist, setUserlist] = useState([]);
    const [updateNameMap, setUpdateNameMap] = useState({});
    // 在 updateNameMap 更新時執行 console.log
    useEffect(() => {
      console.log('Latest updateNameMap:', updateNameMap);
    }, [updateNameMap]); 
  
    const createUser = () => {
      if (isNaN(frontinputphone)) {
        alert("電話請輸入數字");
        return; // 中止函式執行
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
      event.preventDefault(); // Prevent the default form submission
      const newfrontinputname = updateNameMap[userId] || '';
      updateUserName(userId, newfrontinputname);
      clearInputnewName();
    };
    
    
  const handleNameChange = (event, userId) => {
    const newName = event.target.value;
    setUpdateNameMap((prevMap) => ({
      ...prevMap,
      [userId]: newName,
    }));
  };

  return (
    <div className="App">
      <div className="adduser">
        <FormInput label="Name" value={frontinputname} onChange={storeName} />
        <FormInput label="Gender" value={frontinputgender} onChange={storeGender} />
        <FormInput label="Phone" value={frontinputphone} onChange={storePhone} />
        <FormInput label="Email" value={frontinputemail} onChange={storeEmail} />
        <button onClick={() => { createUser(); clearInput(); }}>Add User</button>
      </div>

      <div className="showusers">
        <button onClick={readUser}>Show User</button>
        {userlist.map((user) => (
          <UserCard
            key={user.user_id}
            user={user}
            handleUpdateSubmit={handleUpdateSubmit}
            updateNameMap={updateNameMap}
            handleNameChange={handleNameChange}
            deleteUser={deleteUser}
          />
        ))}
      </div>
    </div>
  );
}

export default App1;
