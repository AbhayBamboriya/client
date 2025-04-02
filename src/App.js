import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';

import StudentSignup from './components/Auth/StudentSignup';
import TeacherSignup from './components/Auth/TeacherSignup';
import './App.css';
import Signup from './components/Auth/Signup'
import StudentWelcome from './components/Auth/StudentWelcome';
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* check */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/student" element={<StudentSignup />} />
          <Route path="/signup/teacher" element={<TeacherSignup />} />
          <Route path="/" element={<Login />} />
          <Route path='/student-dashboard' element={<StudentWelcome/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;