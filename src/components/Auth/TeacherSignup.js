import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../Helper/AxiosInstance';
import Sidebar from './SlideBar';

const TeacherSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    subjects: [],
    role: 'teacher'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { name, email, password, password2, subjects } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubjectChange = e => {
    const value = e.target.value;
    
    if (e.target.checked) {
      setFormData({
        ...formData,
        subjects: [...subjects, value]
      });
    } else {
      setFormData({
        ...formData,
        subjects: subjects.filter(subject => subject !== value)
      });
    }
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    
    if (password !== password2) {
      setError('Passwords do not match');
      return;
    }
  
    
    try {
      const res = await axiosInstance.post('/auth/signup', formData);
      
      // Save token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Redirect to teacher dashboard
      navigate('/teacher-dashboard');
    } catch (err) {
      setError(err.response.data.msg || 'Registration failed');
    }
  };
  
  return (
    <div className="signup-container">
      {/* <Sidebar/> */}
      <h2>Teacher Sign Up</h2>
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
        {/* <div className="form-group">
          <label>Subjects You Teach</label>
          <div className="checkbox-group">
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="math"
                value="Mathematics"
                onChange={onSubjectChange}
              />
              <label htmlFor="math">Mathematics</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="science"
                value="Science"
                onChange={onSubjectChange}
              />
              <label htmlFor="science">Science</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="english"
                value="English"
                onChange={onSubjectChange}
              />
              <label htmlFor="english">English</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="history"
                value="History"
                onChange={onSubjectChange}
              />
              <label htmlFor="history">History</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="geography"
                value="Geography"
                onChange={onSubjectChange}
              />
              <label htmlFor="geography">Geography</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="arts"
                value="Arts"
                onChange={onSubjectChange}
              />
              <label htmlFor="arts">Arts</label>
            </div>
            <div className="checkbox-item">
              <input
                type="checkbox"
                id="computer"
                value="Computer Science"
                onChange={onSubjectChange}
              />
              <label htmlFor="computer">Computer Science</label>
            </div>
          </div>
        </div> */}
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default TeacherSignup;