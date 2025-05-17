// src/components/dashboard/StudentsTable.jsx
import React from 'react';
import { getProgressClass } from '../../utils/helpers';

const StudentsTable = ({ students, toggleAttendanceMode }) => {
  return (
    <>
      <div className="students-header">
        <h3 className="students-title">
          Student List
        </h3>
        <div className="student-actions">
          <button 
            className="take-attendance-btn"
            onClick={toggleAttendanceMode}
          >
            Take Attendance
          </button>
          <button className="add-student-btn">Add Student</button>
        </div>
      </div>
      
      <div className="students-table-container">
        {students.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Attendance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student.id}>
                  <td>
                    <div className="student-info">
                      <div className="student-avatar"></div>
                      <div>
                        <p className="student-name">{student.name}</p>
                        <p className="student-id">RollNo: {student.rollNo}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="progress-info">
                      <span className="progress-value">{student.attendance}%</span>
                      <div className="mini-progress-container">
                        <div 
                          className={`mini-progress-bar ${getProgressClass(student.attendance)}`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button className="view-details-btn">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-students-message">
            No students found
          </div>
        )}
      </div>
    </>
  );
};

export default StudentsTable;