// src/pages/TeacherDashboard.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Teacher.css';

// Layout Components
// import Sidebar from '../components/layout/Sidebar';
import Header from '../components/common/Header';
import NavigationTabs from '../components/common/NavigationTabs';

// Dashboard Components
import ClassSelection from '../components/dashboard/ClassSelection';
import StudentsTable from '../components/dashboard/StudentsTable';
import AttendanceTable from '../components/dashboard/AttendanceTable';
// import PlaceholderContent from '../components/dashboard/PlaceholderContent';

// Custom Hooks
// import { useStudentData } from '../hooks/useStudentData';
import { useAttendance } from '../hooks/useAttendance';
import Sidebar from '../components/layout/SideBar';
import PlaceholderContent from '../components/dashboard/PlaceHolderContent';
import { useStudentData } from '../Hooks/useStudentData';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('students');
  
  // Student data management
  const {
    selectedClass,
    selectedSection,
    showStudents,
    currentStudents,
    handleClassChange,
    handleSectionChange,
    handleViewStudents,
    setShowStudents
  } = useStudentData();
  
  // Attendance management
  const {
    attendanceMode,
    selectedDate,
    attendanceData,
    isSubmitting,
    submitMessage,
    toggleAttendanceMode,
    handleDateChange,
    handleAttendanceChange,
    handleRemarksChange,
    submitAttendance
  } = useAttendance(currentStudents);

  // Reset selections when changing tabs
  useEffect(() => {
    setShowStudents(false);
  }, [activeTab, setShowStudents]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="main-content">
        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Students Tab Content */}
        {activeTab === 'students' && (
          <div className="students-container">
            {/* Class and Section Selection */}
            <ClassSelection 
              selectedClass={selectedClass}
              selectedSection={selectedSection}
              handleClassChange={handleClassChange}
              handleSectionChange={handleSectionChange}
              handleViewStudents={handleViewStudents}
            />
            
            {/* Students List */}
            {showStudents && (
              <>
                {attendanceMode ? (
                  <AttendanceTable 
                    students={currentStudents}
                    selectedDate={selectedDate}
                    handleDateChange={handleDateChange}
                    attendanceData={attendanceData}
                    handleAttendanceChange={handleAttendanceChange}
                    handleRemarksChange={handleRemarksChange}
                    submitAttendance={submitAttendance}
                    isSubmitting={isSubmitting}
                    submitMessage={submitMessage}
                    selectedClass={selectedClass}
                    selectedSection={selectedSection}
                  />
                ) : (
                  <StudentsTable 
                    students={currentStudents} 
                    toggleAttendanceMode={toggleAttendanceMode} 
                  />
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
          <PlaceholderContent 
            title="Calendar Tab" 
            text="Calendar and scheduling tools will appear here" 
          />
        )}
        
        {activeTab === 'reports' && (
          <PlaceholderContent 
            title="Reports Tab" 
            text="Analytics and reporting tools will appear here" 
          />
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;