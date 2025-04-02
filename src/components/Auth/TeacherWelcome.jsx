import React from 'react';
import './WelcomePages.css';

const TeacherWelcome = ({ teacherName = "Teacher" }) => {
  return (
    <div className="welcome-container teacher-welcome">
      <div className="welcome-header">
        <h1>Welcome, <span className="username">{teacherName}</span>!</h1>
        <p className="welcome-subtitle">Your virtual classroom awaits</p>
      </div>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Classes</h3>
          <p className="stat-number">5</p>
          <p className="stat-description">Active courses</p>
        </div>
        <div className="stat-card">
          <h3>Students</h3>
          <p className="stat-number">87</p>
          <p className="stat-description">Enrolled students</p>
        </div>
        <div className="stat-card">
          <h3>Assignments</h3>
          <p className="stat-number">12</p>
          <p className="stat-description">Need grading</p>
        </div>
      </div>
      
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-button">Create Assignment</button>
          <button className="action-button">Schedule Class</button>
          <button className="action-button">Message Students</button>
          <button className="action-button">View Reports</button>
        </div>
      </div>
      
      <div className="upcoming-section">
        <h2>Upcoming Schedule</h2>
        <div className="schedule-list">
          <div className="schedule-item">
            <div className="schedule-time">9:00 AM</div>
            <div className="schedule-details">
              <h4>Advanced Mathematics</h4>
              <p>Grade 10 • Room 203</p>
            </div>
          </div>
          <div className="schedule-item">
            <div className="schedule-time">11:30 AM</div>
            <div className="schedule-details">
              <h4>Physics Lab</h4>
              <p>Grade 11 • Science Lab</p>
            </div>
          </div>
          <div className="schedule-item">
            <div className="schedule-time">2:15 PM</div>
            <div className="schedule-details">
              <h4>Faculty Meeting</h4>
              <p>All Teachers • Conference Room</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherWelcome;