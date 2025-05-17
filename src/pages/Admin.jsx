import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './Admin.css';
import axiosInstance from '../Helper/AxiosInstance';

const AdminDashboard = () => {
  const [uploadStatus, setUploadStatus] = useState({ loading: false, message: '', error: false });
  const [academicYear, setAcademicYear] = useState('');
  const [classSection, setClassSection] = useState('');
  
  // State for student management section
  const [filterYear, setFilterYear] = useState('');
  const [filterSection, setFilterSection] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        handleFileUpload(acceptedFiles[0]);
      }
    }
  });

  const handleFileUpload = async (file) => {
    if (!academicYear || !classSection) {
      setUploadStatus({
        loading: false,
        message: 'Please select academic year and class section',
        error: true
      });
      return;
    }

    setUploadStatus({ loading: true, message: 'Uploading student list...', error: false });
    
    const formData = new FormData();
    formData.append('studentListPdf', file);
    formData.append('academicYear', academicYear);
    formData.append('classSection', classSection);
    
    try {
      const response = await axiosInstance.post('/auth/upload-student-list', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      setUploadStatus({
        loading: false,
        message: `Successfully uploaded! ${response.data.studentsCount} students extracted and stored.`,
        error: false
      });
      
      // If the uploaded list matches our current filter, refresh the student list
      if (filterYear === academicYear && filterSection === classSection) {
        fetchStudents(academicYear, classSection);
      }
    } catch (error) {
      setUploadStatus({
        loading: false,
        message: error.response?.data?.message || 'Failed to upload student list',
        error: true
      });
    }
  };

  // Function to fetch students based on year and section
  const fetchStudents = async (year, section) => {
    if (!year || !section) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `/api/admin/students?academicYear=${year}&classSection=${section}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        }
      );
      
      setStudents(response.data.students || []);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load student list');
      setStudents([]);
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = () => {
    fetchStudents(filterYear, filterSection);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="dashboard-section">
        <h2>Upload Student Lists</h2>
        <p>Upload PDF files containing student information to be assigned to classes.</p>
        
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="academicYear">Academic Year:</label>
            <select 
              id="academicYear" 
              value={academicYear} 
              onChange={(e) => setAcademicYear(e.target.value)}
              required
            >
              <option value="">Select Year</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2023-2024">2023-2024</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="classSection">Class & Section:</label>
            <select 
              id="classSection" 
              value={classSection} 
              onChange={(e) => setClassSection(e.target.value)}
              required
            >
              <option value="">Select Class & Section</option>
              <option value="1A">Class 1 - Section A</option>
              <option value="1B">Class 1 - Section B</option>
              <option value="2A">Class 2 - Section A</option>
              <option value="2B">Class 2 - Section B</option>
              {/* Add more class options as needed */}
            </select>
          </div>
          
          <div className="file-upload-container">
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p>Drag & drop a PDF file here, or click to select</p>
              <small>Only PDF files containing student lists are accepted</small>
            </div>
          </div>
          
          {uploadStatus.message && (
            <div className={`upload-status ${uploadStatus.error ? 'error' : 'success'}`}>
              {uploadStatus.loading ? (
                <div className="loading-spinner"></div>
              ) : null}
              {uploadStatus.message}
            </div>
          )}
        </div>
      </div>
      
      <div className="dashboard-section">
        <h2>Manage Student Lists</h2>
        <p>View and manage uploaded student lists by year and class.</p>
        
        <div className="student-list-container">
          <div className="student-filter">
            <div className="form-group">
              <label htmlFor="filterYear">Academic Year:</label>
              <select 
                id="filterYear" 
                value={filterYear} 
                onChange={(e) => setFilterYear(e.target.value)}
              >
                <option value="">Select Year</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2023-2024">2023-2024</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="filterSection">Class & Section:</label>
              <select 
                id="filterSection" 
                value={filterSection} 
                onChange={(e) => setFilterSection(e.target.value)}
              >
                <option value="">Select Class & Section</option>
                <option value="1A">Class 1 - Section A</option>
                <option value="1B">Class 1 - Section B</option>
                <option value="2A">Class 2 - Section A</option>
                <option value="2B">Class 2 - Section B</option>
              </select>
            </div>
            
            <div className="form-group" style={{ alignSelf: 'flex-end' }}>
              <button className="btn btn-refresh" onClick={handleFilterChange}>
                <span>View Students</span>
              </button>
            </div>
          </div>
          
          {loading && <div className="loading-spinner"></div>}
          
          {error && <div className="upload-status error">{error}</div>}
          
          {!loading && !error && filterYear && filterSection && (
            <>
              <div className="filter-info">
                Showing students for Academic Year: {filterYear}, Class & Section: {filterSection}
              </div>
              
              {students.length > 0 ? (
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
                      <tr key={student.id || student._id}>
                        <td>{student.rollNumber}</td>
                        <td>{student.name}</td>
                        <td>{student.admissionNumber}</td>
                        <td className="student-actions">
                          <button className="btn btn-small">Edit</button>
                          <button className="btn btn-small btn-secondary">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-students">
                  No students found for Academic Year: {filterYear}, Class & Section: {filterSection}
                </div>
              )}
            </>
          )}
          
          {!filterYear || !filterSection ? (
            <div className="no-students">
              Please select an academic year and class section to view students
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;