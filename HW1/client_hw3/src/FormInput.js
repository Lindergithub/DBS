import React from 'react';

const FormInput = ({ label, value, onChange }) => {
  return (
    <div>
      <label>{label}:</label>
      <input type="text" onChange={onChange} value={value} />
    </div>
  );
};

export default FormInput;