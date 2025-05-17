import React, { useState, useEffect } from 'react';
import './Teacher.css';
import Sidebar from './SlideBar';
import axios from 'axios';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showStudents, setShowStudents] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [attendanceMode, setAttendanceMode] = useState(false);
  const [attendanceData, setAttendanceData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const [attendanceInitialized, setAttendanceInitialized] = useState(false);
  
  // Get current date in YYYY-MM-DD format for the date picker
  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Sample class and section data
  const classOptions = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const sectionOptions = ['Section A', 'Section B', 'Section C'];
  
  // Sample student data organized by class and section
  const studentData = {
    'Class 6': {
      'Section A': [
        { id: 1, name: 'Emma Johnson', attendance: 95, rollNo: '6A01' },
        { id: 2, name: 'Liam Smith', attendance: 85, rollNo: '6A02' },
      ],
      'Section B': [
        { id: 3, name: 'Olivia Williams', attendance: 75, rollNo: '6B01' },
        { id: 4, name: 'Noah Brown', attendance: 90, rollNo: '6B02' },
      ],
      'Section C': [
        { id: 5, name: 'Ava Jones', attendance: 98, rollNo: '6C01' },
        { id: 6, name: 'William Davis', attendance: 88, rollNo: '6C02' },
      ]
    },
    'Class 7': {
      'Section A': [
        { id: 7, name: 'Sophia Miller', attendance: 92, rollNo: '7A01' },
        { id: 8, name: 'James Wilson', attendance: 80, rollNo: '7A02' },
      ],
      'Section B': [
        { id: 9, name: 'Isabella Moore', attendance: 70, rollNo: '7B01' },
        { id: 10, name: 'Benjamin Taylor', attendance: 93, rollNo: '7B02' },
      ],
      'Section C': [
        { id: 11, name: 'Mia Anderson', attendance: 96, rollNo: '7C01' },
        { id: 12, name: 'Lucas Thomas', attendance: 82, rollNo: '7C02' },
      ]
    },
    'Class 8': {
      'Section A': [
        { id: 13, name: 'Charlotte Harris', attendance: 91, rollNo: '8A01' },
        { id: 14, name: 'Henry Martin', attendance: 83, rollNo: '8A02' },
      ],
      'Section B': [
        { id: 15, name: 'Amelia Thompson', attendance: 72, rollNo: '8B01' },
        { id: 16, name: 'Alexander White', attendance: 89, rollNo: '8B02' },
      ],
      'Section C': [
        { id: 17, name: 'Harper Lewis', attendance: 97, rollNo: '8C01' },
        { id: 18, name: 'Daniel Walker', attendance: 81, rollNo: '8C02' },
      ]
    },
    'Class 9': {
      'Section A': [
        { id: 19, name: 'Evelyn Hall', attendance: 94, rollNo: '9A01' },
        { id: 20, name: 'Michael Allen', attendance: 86, rollNo: '9A02' },
      ],
      'Section B': [
        { id: 21, name: 'Abigail Young', attendance: 79, rollNo: '9B01' },
        { id: 22, name: 'Matthew King', attendance: 92, rollNo: '9B02' },
      ],
      'Section C': [
        { id: 23, name: 'Elizabeth Wright', attendance: 99, rollNo: '9C01' },
        { id: 24, name: 'Joseph Scott', attendance: 87, rollNo: '9C02' },
      ]
    },
    'Class 10': {
      'Section A': [
        { id: 25, name: 'Sofia Green', attendance: 90, rollNo: '10A01' },
        { id: 26, name: 'David Baker', attendance: 84, rollNo: '10A02' },
      ],
      'Section B': [
        { id: 27, name: 'Victoria Adams', attendance: 73, rollNo: '10B01' },
        { id: 28, name: 'Christopher Nelson', attendance: 91, rollNo: '10B02' },
      ],
      'Section C': [
        { id: 29, name: 'Grace Carter', attendance: 95, rollNo: '10C01' },
        { id: 30, name: 'Andrew Mitchell', attendance: 85, rollNo: '10C02' },
      ]
    }
  };

  // Get current students based on selected class and section
  const getCurrentStudents = () => {
    if (selectedClass && selectedSection && studentData[selectedClass] && studentData[selectedClass][selectedSection]) {
      return studentData[selectedClass][selectedSection];
    }
    return [];
  };
  
  const currentStudents = getCurrentStudents();

  // Initialize attendance data when students or date changes
  useEffect(() => {
    if (currentStudents.length > 0 && !attendanceInitialized) {
      const initialAttendance = {};
      currentStudents.forEach(student => {
        initialAttendance[student.id] = { status: 'present', remarks: '' };
      });
      setAttendanceData(initialAttendance);
      setAttendanceInitialized(true);
    }
  }, [currentStudents, attendanceInitialized]);

  // Reset attendance initialized flag when class/section/date changes
  useEffect(() => {
    setAttendanceInitialized(false);
  }, [selectedClass, selectedSection, selectedDate]);

  // Fetch existing attendance data for selected date when entering attendance mode
  useEffect(() => {
    if (attendanceMode && selectedClass && selectedSection && selectedDate) {
      fetchAttendanceData();
    }
  }, [attendanceMode]); // Only run when attendance mode changes

  // Function to fetch attendance data from the server
  const fetchAttendanceData = async () => {
    try {
      // This would be a real API call in production
      // For now, we're just simulating a successful API response
      console.log('Fetching attendance data for:', {
        class: selectedClass,
        section: selectedSection,
        date: selectedDate
      });
      
      // In a real app, you'd use the data from the response
      // For now, we'll just keep using the initial data
      // setAttendanceData(response.data.attendance);
      
      setAttendanceInitialized(true);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      // If server is not available, we'll use the initialized data
    }
  };

  // Handle class selection change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSection('');
    setShowStudents(false);
    setAttendanceMode(false);
    setAttendanceInitialized(false);
  };

  // Handle section selection change
  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setShowStudents(false);
    setAttendanceMode(false);
    setAttendanceInitialized(false);
  };
  
  // Handle view students button click
  const handleViewStudents = () => {
    if (selectedClass && selectedSection) {
      setShowStudents(true);
      setAttendanceMode(false);
    }
  };

  // Handle attendance mode toggle
  const toggleAttendanceMode = () => {
    setAttendanceMode(!attendanceMode);
  };

  // Handle date change for attendance
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setAttendanceInitialized(false);
  };

  // Handle attendance status change
  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], status }
    }));
  };

  // Handle remarks change
  const handleRemarksChange = (studentId, remarks) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], remarks }
    }));
  };

  // Submit attendance data to server
  const submitAttendance = async () => {
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      // Prepare attendance data for submission
      const attendancePayload = {
        class: selectedClass,
        section: selectedSection,
        date: selectedDate,
        attendance: attendanceData,
        students: currentStudents.map(student => ({
          id: student.id,
          name: student.name,
          rollNo: student.rollNo
        }))
      };

      // Simulate API call (in a real app, this would be an actual API call)
      console.log('Submitting attendance data:', attendancePayload);
      
      // Simulate successful submission
      setTimeout(() => {
        setSubmitMessage({ 
          type: 'success', 
          text: 'Attendance submitted successfully!' 
        });
        
        // Exit attendance mode after successful submission
        setTimeout(() => {
          setAttendanceMode(false);
          setSubmitMessage({ type: '', text: '' });
        }, 2000);
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Failed to submit attendance. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to determine progress bar class
  const getProgressClass = (value) => {
    if (value > 90) return 'progress-excellent';
    if (value > 80) return 'progress-good';
    if (value > 70) return 'progress-average';
    return 'progress-needs-improvement';
  };

  // Reset the class selection when changing tabs
  useEffect(() => {
    setSelectedClass('');
    setSelectedSection('');
    setShowStudents(false);
  }, [activeTab]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar/>
      
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-circle">AE</div>
            <h1 className="logo-text">ATTEND EASE</h1>
          </div>
          <div className="header-actions">
            <div className="search-container">
              <span className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input type="text" placeholder="Search..." className="search-input" />
            </div>
            <div className="user-actions">
              <span className="notification-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </span>
              <div className="user-avatar">
                <img src="/api/placeholder/40/40" alt="Teacher" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Navigation Tabs */}
        <div className="nav-tabs">
          <button 
            className={`tab-button ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
          <button 
            className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar
          </button>
          <button 
            className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>

        {/* Students Tab Content */}
        {activeTab === 'students' && (
          <div className="students-container">
            {/* Class and Section Selection */}
            <div className="class-selection-container">
              <h3 className="selection-title">Select Class and Section</h3>
              <div className="selection-controls">
                <div className="selection-group">
                  <label htmlFor="classSelect">Class:</label>
                  <select 
                    id="classSelect" 
                    value={selectedClass} 
                    onChange={handleClassChange}
                    className="selection-dropdown"
                  >
                    <option value="">Select Class</option>
                    {classOptions.map(classOption => (
                      <option key={classOption} value={classOption}>{classOption}</option>
                    ))}
                  </select>
                </div>
                
                <div className="selection-group">
                  <label htmlFor="sectionSelect">Section:</label>
                  <select 
                    id="sectionSelect" 
                    value={selectedSection} 
                    onChange={handleSectionChange}
                    className="selection-dropdown"
                    disabled={!selectedClass}
                  >
                    <option value="">Select Section</option>
                    {selectedClass && sectionOptions.map(sectionOption => (
                      <option key={sectionOption} value={sectionOption}>{sectionOption}</option>
                    ))}
                  </select>
                </div>
                
                <button 
                  className="view-students-btn"
                  onClick={handleViewStudents}
                  disabled={!selectedClass || !selectedSection}
                >
                  View Students
                </button>
              </div>
            </div>
            
            {/* Students List */}
            {showStudents && (
              <>
                <div className="students-header">
                  <h3 className="students-title">
                    Student List - {selectedClass} {selectedSection}
                  </h3>
                  <div className="student-actions">
                    <button 
                      className={`take-attendance-btn ${attendanceMode ? 'active' : ''}`}
                      onClick={toggleAttendanceMode}
                    >
                      {attendanceMode ? 'Cancel Attendance' : 'Take Attendance'}
                    </button>
                    <button className="add-student-btn">Add Student</button>
                  </div>
                </div>
                
                {/* Attendance Taking Mode */}
                {attendanceMode && (
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
                          {currentStudents.map(student => {
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
                        onClick={submitAttendance}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Attendance'}
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Regular Student List View (when not in attendance mode) */}
                {!attendanceMode && (
                  <div className="students-table-container">
                    {currentStudents.length > 0 ? (
                      <table className="students-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Attendance</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentStudents.map(student => (
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
                        No students found for {selectedClass} {selectedSection}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
            
            {/* Initial prompt if no class/section selected */}
            {!showStudents && (
              <div className="selection-prompt">
                <p>Please select a class and section, then click "View Students" to see the student list.</p>
              </div>
            )}
          </div>
        )}

        {/* Placeholder for other tabs */}
        {activeTab === 'calendar' && (
          <div className="placeholder-container">
            <h3 className="placeholder-title">Calendar Tab</h3>
            <p className="placeholder-text">Calendar and scheduling tools will appear here</p>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="placeholder-container">
            <h3 className="placeholder-title">Reports Tab</h3>
            <p className="placeholder-text">Analytics and reporting tools will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;