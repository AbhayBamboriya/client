import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherClassView = ({ academicYear, classSection }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/teacher/students?academicYear=${academicYear}&classSection=${classSection}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
          }
        );
        
        setStudents(response.data.students);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load student list');
        setLoading(false);
      }
    };
    
    if (academicYear && classSection) {
      fetchStudents();
    }
  }, [academicYear, classSection]);
  
  if (loading) return <div className="loading">Loading student list...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!students || students.length === 0) {
    return <div className="no-students">No students found for this class section.</div>;
  }
  
  return (
    <div className="student-list">
      <h3>Class {classSection} - Academic Year {academicYear}</h3>
      <table className="student-table">
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            <th>Admission No.</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.rollNumber}</td>
              <td>{student.name}</td>
              <td>{student.admissionNumber}</td>
              <td>
                <button className="btn btn-small">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherClassView;