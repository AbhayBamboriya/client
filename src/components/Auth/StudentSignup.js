import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Helper/AxiosInstance';
import Sidebar from './SlideBar';

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    grade: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { name, email, password, password2, grade } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const res = await axiosInstance.post('/auth/signup', formData);
      console.log('res is',res);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Redirect to student dashboard
      navigate('/student-dashboard');
    } catch (err) {
      setError(err.response.data.msg || 'Registration failed');
    }
  };
  
  return (
    <div className="signup-container">
      <h2>Student Sign Up</h2>
      <Sidebar/>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label>Grade/Class</label>
          <select name="grade" value={grade} onChange={onChange} required>
            <option value="">Select Your Grade</option>
            <option value="1">I Year</option>
            <option value="2">II Year</option>
            <option value="3">III Year</option>
            <option value="4">IV Year</option>
            
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default StudentSignup;