// import React, { useState } from 'react';
// import './WelcomePages.css';
// import Sidebar from './SlideBar';
// import SubjectAttendance from './SubjectAttendance';

// const StudentWelcome = ({ studentName = "Student" }) => {
//   const [activeTab, setActiveTab] = useState('overview');
    
//   // Sample data
//   const classData = {
//     attendance: 87,
//     assignments: 92,
//     averageGrade: 84,
//     upcomingDeadlines: [
//       { id: 1, title: 'Math Quiz', date: 'Apr 10, 2025', course: 'Mathematics' },
//       { id: 2, title: 'Essay Submission', date: 'Apr 15, 2025', course: 'English' },
//       { id: 3, title: 'Group Project', date: 'Apr 20, 2025', course: 'Science' }
//     ],
//     recentActivities: [
//       { id: 1, activity: 'Posted new assignment', time: '2 hours ago', course: 'Mathematics' },
//       { id: 2, activity: 'Graded essays', time: '5 hours ago', course: 'English' },
//       { id: 3, activity: 'Created exam', time: '1 day ago', course: 'History' }
//     ],
//     students: [
//       { id: 1, name: 'Emma Johnson', attendance: 95, grade: 92, status: 'Excellent' },
//       { id: 2, name: 'Liam Smith', attendance: 85, grade: 78, status: 'Good' },
//       { id: 3, name: 'Olivia Williams', attendance: 75, grade: 65, status: 'Needs Improvement' },
//       { id: 4, name: 'Noah Brown', attendance: 90, grade: 88, status: 'Very Good' },
//       { id: 5, name: 'Ava Jones', attendance: 98, grade: 95, status: 'Excellent' }
//     ]
//   };

//   // Helper function to determine status class
//   const getStatusClass = (status) => {
//     switch(status) {
//       case 'Excellent': return 'status-excellent';
//       case 'Very Good': return 'status-very-good';
//       case 'Good': return 'status-good';
//       default: return 'status-improvement';
//     }
//   };

//   // Helper function to determine progress bar class
//   const getProgressClass = (value) => {
//     if (value > 90) return 'progress-excellent';
//     if (value > 80) return 'progress-good';
//     if (value > 70) return 'progress-average';
//     return 'progress-needs-improvement';
//   };
  
//   return (
//     <div className="welcome-container student-welcome">
//       <Sidebar/>
//       {activeTab === 'overview' && (
//         <div className="dashboard-overview">
//           <div className="metrics-grid">
//             {/* Overall Attendance Card */}
//             <div className="metric-card">
//               <div className="metric-header">
//                 <h3 className="metric-title">Overall Attendance</h3>
//                 <span className="metric-badge good">Good</span>
//               </div>
//               <div className="metric-value">
//                 <p className="value">{classData.attendance}%</p>
//               </div>
//               <div className="progress-container">
//                 <div className="progress-bar progress-blue" style={{ width: `${classData.attendance}%` }}></div>
//               </div>
//               <p className="metric-updated">Last updated: Today</p>
//             </div>
//           </div>

//           {/* Subject Attendance Component */}
//           <SubjectAttendance />
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentWelcome;



import React, { useState } from 'react';
import './WelcomePages.css';
import Sidebar from './SlideBar';

const StudentWelcome = ({ studentName = "Student" }) => {
  const [activeTab, setActiveTab] = useState('overview');
    
  // Sample data with individual subject attendance
  const classData = {
    attendance: 87,
    assignments: 92,
    averageGrade: 84,
    subjectAttendance: [
      { id: 1, subject: 'sub1', attendance: 92, classes: 25, present: 23 },
      { id: 2, subject: 'sub2', attendance: 85, classes: 20, present: 17 },
      { id: 3, subject: 'sub3', attendance: 90, classes: 22, present: 20 },
      { id: 4, subject: 'sub4', attendance: 78, classes: 18, present: 14 },
      { id: 5, subject: 'sub5', attendance: 95, classes: 15, present: 14 }
    ],
    upcomingDeadlines: [
      { id: 1, title: 'Math Quiz', date: 'Apr 10, 2025', course: 'Mathematics' },
      { id: 2, title: 'Essay Submission', date: 'Apr 15, 2025', course: 'English' },
      { id: 3, title: 'Group Project', date: 'Apr 20, 2025', course: 'Science' }
    ],
    recentActivities: [
      { id: 1, activity: 'Posted new assignment', time: '2 hours ago', course: 'Mathematics' },
      { id: 2, activity: 'Graded essays', time: '5 hours ago', course: 'English' },
      { id: 3, activity: 'Created exam', time: '1 day ago', course: 'History' }
    ],
    students: [
      { id: 1, name: 'Emma Johnson', attendance: 95, grade: 92, status: 'Excellent' },
      { id: 2, name: 'Liam Smith', attendance: 85, grade: 78, status: 'Good' },
      { id: 3, name: 'Olivia Williams', attendance: 75, grade: 65, status: 'Needs Improvement' },
      { id: 4, name: 'Noah Brown', attendance: 90, grade: 88, status: 'Very Good' },
      { id: 5, name: 'Ava Jones', attendance: 98, grade: 95, status: 'Excellent' }
    ]
  };
  
  // Helper function to determine status class
  const getStatusClass = (value) => {
    if (value > 90) return 'status-excellent';
    if (value > 80) return 'status-good';
    if (value > 70) return 'status-average';
    return 'status-improvement';
  };
  
  // Helper function to determine progress bar class
  const getProgressClass = (value) => {
    if (value > 90) return 'progress-excellent';
    if (value > 80) return 'progress-good';
    if (value > 70) return 'progress-average';
    return 'progress-needs-improvement';
  };
  
  return (
    <div className="welcome-container student-welcome">
      <Sidebar/>
      {activeTab === 'overview' && (
        <div className="dashboard-overview">
          <h2 className="dashboard-title">Welcome, {studentName}!</h2>
          
          <div className="metrics-grid">
            {/* Overall Attendance Card */}
            <div className="metric-card">
              <div className="metric-header">
                <h3 className="metric-title">Overall Attendance</h3>
                <span className={`metric-badge ${getStatusClass(classData.attendance)}`}>
                  {classData.attendance > 90 ? 'Excellent' : 
                   classData.attendance > 80 ? 'Good' : 
                   classData.attendance > 70 ? 'Average' : 'Needs Improvement'}
                </span>
              </div>
              <div className="metric-value">
                <p className="value">{classData.attendance}%</p>
              </div>
              <div className="progress-container">
                <div className={`progress-bar ${getProgressClass(classData.attendance)}`} style={{ width: `${classData.attendance}%` }}></div>
              </div>
              <p className="metric-updated">Last updated: Today</p>
            </div>
          </div>

          {/* Subject-wise Attendance Section */}
          <div className="subject-attendance-section">
            <h3 className="section-title">Subject-wise Attendance</h3>
            
            <div className="subject-attendance-container">
              {classData.subjectAttendance.map(subject => (
                <div key={subject.id} className="subject-attendance-card">
                  <div className="subject-info">
                    <h4 className="subject-name">{subject.subject}</h4>
                    <span className={`attendance-badge ${getStatusClass(subject.attendance)}`}>
                      {subject.attendance}%
                    </span>
                  </div>
                  <div className="attendance-details">
                    <span className="attendance-present">Present: {subject.present}/{subject.classes} classes</span>
                  </div>
                  <div className="progress-container">
                    <div 
                      className={`progress-bar ${getProgressClass(subject.attendance)}`} 
                      style={{ width: `${subject.attendance}%` }}
                    ></div>
                  </div>
                  <div className="attendance-actions">
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="info-grid">
            {/* Upcoming Deadlines can be re-enabled here if needed */}
            {/* Recent Activities can be re-enabled here if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentWelcome;