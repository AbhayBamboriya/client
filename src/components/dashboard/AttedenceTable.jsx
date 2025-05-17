// src/components/dashboard/AttendanceTable.jsx
import React from 'react';
import { getCurrentDate } from '../../utils/helpers';

const AttendanceTable = ({ 
  students, 
  selectedDate, 
  handleDateChange, 
  attendanceData, 
  handleAttendanceChange, 
  handleRemarksChange, 
  submitAttendance, 
  isSubmitting, 
  submitMessage, 
  selectedClass, 
  selectedSection 
}) => {
  return (
    <div className="attendance-controls">
      <h4>Taking Attendance for {selectedClass} {selectedSection}</h4>
      <div className="attendance-date-container">
        <label htmlFor="attendanceDate">Date:</label>
        <input 
          type="date" 
          id="attendanceDate" 
          value={selectedDate} 
          onChange={handleDateChange}
          max={getCurrentDate()}
        />
      </div>
      
      {submitMessage.text && (
        <div className={`submit-message ${submitMessage.type}`}>
          {submitMessage.text}
        </div>
      )}
      
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => {
              const studentAttendance = attendanceData[student.id] || { status: 'present', remarks: '' };
              return (
                <tr key={student.id}>
                  <td>{student.rollNo}</td>
                  <td>{student.name}</td>
                  <td>
                    <div className="attendance-status-options">
                      <label className={`status-option ${studentAttendance.status === 'present' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name={`attendance-${student.id}`} 
                          value="present"
                          checked={studentAttendance.status === 'present'}
                          onChange={() => handleAttendanceChange(student.id, 'present')}
                        />
                        Present
                      </label>
                      <label className={`status-option ${studentAttendance.status === 'absent' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name={`attendance-${student.id}`} 
                          value="absent"
                          checked={studentAttendance.status === 'absent'}
                          onChange={() => handleAttendanceChange(student.id, 'absent')}
                        />
                        Absent
                      </label>
                      <label className={`status-option ${studentAttendance.status === 'late' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name={`attendance-${student.id}`} 
                          value="late"
                          checked={studentAttendance.status === 'late'}
                          onChange={() => handleAttendanceChange(student.id, 'late')}
                        />
                        Late
                      </label>
                    </div>
                  </td>
                  <td>
                    <input 
                      type="text" 
                      className="remarks-input"
                      placeholder="Add remarks (optional)"
                      value={studentAttendance.remarks || ''}
                      onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="attendance-actions">
        <button 
          className="submit-attendance-btn"
          onClick={() => submitAttendance(selectedClass, selectedSection)}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;