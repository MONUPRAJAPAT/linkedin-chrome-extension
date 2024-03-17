import React from 'react';

function Modal({ company, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{company.name}</h2>
        <p><strong>Website URL:</strong> {company.website}</p>
        <p><strong>Phone Number:</strong> {company.phoneNumber}</p>
        {/* Add more company details here */}
      </div>
    </div>
  );
}

export default Modal;
