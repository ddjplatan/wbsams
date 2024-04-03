import React from 'react';

const AlertModal = ({ isOpen, onClose, onConfirm, text }) => {
  if (!isOpen) return null;

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '999',
  };

  const modalContentStyle = {
    backgroundColor: '#fefefe',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
    maxWidth: '400px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <p>Are you sure you want to {text}?</p>
        <button style={buttonStyle} onClick={onConfirm}>Yes</button>
        <button style={buttonStyle} onClick={onClose}>No</button>
      </div>
    </div>
  );
}

export default AlertModal;
