import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../Helper/AxiosInstance';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const { email, password } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    try {
      // Create the promise
      const loginPromise = axiosInstance.post('/auth/login', formData);
      
      // Use toast.promise with the promise
      toast.promise(
        loginPromise,
        {
          loading: "Wait! Authentication in Progress",
          success: (response) => {
            // This will run when the promise resolves successfully
            console.log('Success response:', response);
            
            // Save token to localStorage if needed
            localStorage.setItem('token', response.data.token);
            
            // Handle navigation if needed
            // navigate('/dashboard');
            
            // Return the message to display in the toast
            return response.data.message || "Login successful!";
          },
          error: (err) => {
            // This will run when the promise rejects
            console.log('Error:', err);
            return err.response?.data?.message || "Failed to login";
          }
        }
      );
      
      // You can also handle the response outside of toast.promise if needed
      const response = await loginPromise;
      console.log('Response outside toast:', response);
      if(response?.data?.success){
         if(response?.data?.user?.role=="student"){
          navigate("/student-dashboard")
         }
         else if(response?.data?.user?.role=="teacher"){
          navigate("/teacher-dashboard")
         }
      }
      
    } catch (err) {
      console.log('Catch block error:', err);
      setError('Login failed');
    }
  };
  
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={onSubmit}>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;