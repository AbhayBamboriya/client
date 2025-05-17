import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';

import StudentSignup from './components/Auth/StudentSignup';
import TeacherSignup from './components/Auth/TeacherSignup';
import './App.css';
import Signup from './components/Auth/Signup'
import StudentWelcome from './components/Auth/StudentWelcome';
import Sidebar from './components/Auth/SlideBar';
import TeacherWelcome from './components/Auth/TeacherWelcome';
import AdminSignup from './components/Auth/AdminSignup';
import Admin from './pages/Admin';
function App() {
  return (
    <Router>
      <div className="app">
        {/* <Sidebar/> */}
        <Routes>
          {/* check */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/student" element={<StudentSignup />} />
          <Route path="/signup/teacher" element={<TeacherSignup />} />
          <Route path="/signup/admin" element={<AdminSignup />} />
          <Route path="/" element={<Login />} />
          <Route path='/student-dashboard' element={<StudentWelcome/>}/>
          <Route path='/admin-dashboard' element={<Admin/>}/>
          <Route path='/teacher-dashboard' element={<TeacherWelcome/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;