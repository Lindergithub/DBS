
import './App.css';
import {useState} from "react";
import Axios from 'axios';
function App() {

  const[name, setName] = useState('');
  const[gender, setGender] = useState('');
  const[phone, setPhone] = useState(0);
  const[email, setEmail] = useState('');

  const[userlist, setUserlist] = useState([]);

  
  const addUser =() => {
    Axios.post("http://localhost:3001/createuser",{
      Name: name,
      Gender: gender,
      Phone: phone,
      Email: email
    }).then((response) => {
      setUserlist([
        ...userlist,
        {
          user_id:response.data.user_id,
          user_name: name,
          user_gender: gender,
          user_phone: phone,
          user_email: email,
        },
      ]);
      console.log(response)
    });
  };



  const getUser =() => {
    Axios.get("http://localhost:3001/readuser").then((response) => {
      setUserlist(response.data);
    });
  };




  return (
    <div className="App">
      <div className="createuser"> 
        <lable>Name:</lable>
        <input 
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
          />
        <lable>Gender:</lable>
        <input 
          type="text"
          onChange={(event) => {
            setGender(event.target.value);
          }}
          />
        <lable>Phone:</lable>
        <input 
          type="number"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
          />
        <lable>Email:</lable>
        <input 
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          />
        <button onClick={addUser}>Add User</button>
      </div>





      <div className="showusers"> 
        <button onClick={getUser}>Show User</button>
        {userlist.map((val, key) =>{
          return (
            <div className = "showuser"> 
              <h3>Id: {val.user_id}</h3>
              <h3>Name: {val.user_name}</h3>
              <h3>Gender: {val.user_gender}</h3>
              <h3>Phone: {val.user_phone}</h3>
              <h3>Email: {val.user_email}</h3>
            </div>
          );
        })
        }
      </div>
    </div>
  );
}

export default App;
