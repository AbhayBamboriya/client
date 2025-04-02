import React from 'react';
import './WelcomePages.css';

const StudentWelcome = ({ studentName = "Student" }) => {
  return (
    <div className="welcome-container student-welcome">
      <div className="welcome-header">
        <h1>Welcome, <span className="username">{studentName}</span>!</h1>
        </div>
    </div>
  );
};

export default StudentWelcome;