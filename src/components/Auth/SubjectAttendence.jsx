import React, { useState } from 'react';

const SubjectAttendance = () => {
  // Sample data for individual subject attendance
  const subjectAttendanceData = [
    { id: 1, subject: 'Mathematics', attendance: 92, totalClasses: 25, present: 23 },
    { id: 2, subject: 'English', attendance: 88, totalClasses: 25, present: 22 },
    { id: 3, subject: 'Science', attendance: 80, totalClasses: 30, present: 24 },
    { id: 4, subject: 'History', attendance: 76, totalClasses: 25, present: 19 },
    { id: 5, subject: 'Computer Science', attendance: 95, totalClasses: 20, present: 19 }
  ];

  // Helper function to determine status class based on attendance percentage
  const getStatusClass = (attendance) => {
    if (attendance >= 90) return 'status-excellent';
    if (attendance >= 80) return 'status-good';
    if (attendance >= 70) return 'status-average';
    return 'status-needs-improvement';
  };

  // Helper function to determine progress bar class
  const getProgressClass = (attendance) => {
    if (attendance >= 90) return 'progress-excellent';
    if (attendance >= 80) return 'progress-good';
    if (attendance >= 70) return 'progress-average';
    return 'progress-needs-improvement';
  };

  // Helper function to get status text
  const getStatusText = (attendance) => {
    if (attendance >= 90) return 'Excellent';
    if (attendance >= 80) return 'Good';
    if (attendance >= 70) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <div className="subject-attendance-container">
      <h2 className="section-title">Subject Attendance</h2>
      
      <div className="subject-attendance-grid">
        {subjectAttendanceData.map(subject => (
          <div key={subject.id} className="subject-card">
            <div className="subject-header">
              <h3 className="subject-name">{subject.subject}</h3>
              <span className={`status-badge ${getStatusClass(subject.attendance)}`}>
                {getStatusText(subject.attendance)}
              </span>
            </div>
            
            <div className="attendance-stats">
              <div className="attendance-value">
                <p className="percentage">{subject.attendance}%</p>
                <p className="classes-info">
                  {subject.present} / {subject.totalClasses} classes
                </p>
              </div>
            </div>
            
            <div className="progress-container">
              <div 
                className={`progress-bar ${getProgressClass(subject.attendance)}`} 
                style={{ width: `${subject.attendance}%` }}
              ></div>
            </div>
            
            <div className="subject-footer">
              <button className="view-details-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectAttendance;