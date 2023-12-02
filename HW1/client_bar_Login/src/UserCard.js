import React from 'react';

const UserCard = ({
  user,
  handleUpdateSubmit,
  updateNameMap,
  handleNameChange,
  deleteUser,
}) => {
  return (
    <div className="showuser" key={user.user_id}>
      <div>
        <h3>Id: {user.user_id}</h3>
        <h3>Name: {user.user_name}</h3>
        <h3>Gender: {user.user_gender}</h3>
        <h3>Phone: {user.user_phone}</h3>
        <h3>Email: {user.user_email}</h3>
      </div>
      <div>
        <form onSubmit={(event) => handleUpdateSubmit(event, user.user_id)}>
          <input
            id={`frontinputname-${user.user_id}`}
            name={`frontinputname-${user.user_id}`}
            type="text"
            onChange={(event) => handleNameChange(event, user.user_id)}
            value={updateNameMap[user.user_id] || ''}
          />
          <button type="submit">Submit Update</button>
        </form>
        <button onClick={() => deleteUser(user.user_id)}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
