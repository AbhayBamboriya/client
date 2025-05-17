// src/components/dashboard/PlaceholderContent.jsx
import React from 'react';

const PlaceholderContent = ({ title, text }) => {
  return (
    <div className="placeholder-container">
      <h3 className="placeholder-title">{title}</h3>
      <p className="placeholder-text">{text}</p>
    </div>
  );
};

export default PlaceholderContent;