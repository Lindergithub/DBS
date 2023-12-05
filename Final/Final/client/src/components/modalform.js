// import React, { useState } from 'react';

// const ModalForm = ({
//   showModal,
//   closeModal,
//   onSubmit,
//   fields,
//   setFields,
//   title,
//   buttonText,
// }) => {
//   const handleChange = (key, value) => {
//     setFields({ ...fields, [key]: value });
//   };

//   return (
//     showModal && (
//       <div className="modal">
//         <div className="modal-content">
//           {Object.entries(fields).map(([key, value]) => (
//             <div key={key}>
//               <input
//                 type="text"
//                 placeholder={key}
//                 value={value}
//                 onChange={(event) => handleChange(key, event.target.value)}
//               />
//               <br />
//             </div>
//           ))}
//         </div>
//         <div className="addcancel">
//           <button onClick={onSubmit}>{buttonText}</button>
//           <br />
//           <button onClick={closeModal}>Cancel</button>
//         </div>
//       </div>
//     )
//   );
// };

// export default ModalForm;
// ModalForm.js
// ModalForm.js
import React from 'react';

const ModalForm = ({ showModal, closeModal, onSubmit, fields, setFields, title, buttonText }) => {
  return (
    <>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* Input fields */}
            {Object.keys(fields).map((key) => (
              <div key={key}>
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}</label>
                <input
                  type="text"
                  id={key}
                  placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}`}
                  value={fields[key]}
                  onChange={(event) => setFields({ ...fields, [key]: event.target.value })}
                />
                <br />
              </div>
            ))}
          </div>
          <div className="addcancel">
            <button onClick={onSubmit}>{buttonText}</button>
            <br />
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalForm;
