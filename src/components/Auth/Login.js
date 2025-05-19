import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Helper/AxiosInstance';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    role: 'student',
    email: '',
    enrollment: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { role, email, enrollment, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const payload =
        role === 'student'
          ? { enrollment, password, role }
          : { email, password, role };

      const loginPromise = axiosInstance.post('/auth/login', payload);

      toast.promise(loginPromise, {
        loading: 'Wait! Authentication in Progress',
        success: (response) => {
          localStorage.setItem('token', response.data.token);
          return response.data.message || 'Login successful!';
        },
        error: (err) => {
          return err.response?.data?.message || 'Failed to login';
        }
      });

      const response = await loginPromise;
      if (response?.data?.success) {
        const userRole = response.data.user.role;
        if (userRole === 'student') navigate('/student-dashboard');
        else if (userRole === 'admin') navigate('/admin-dashboard');
        else if (userRole === 'teacher') navigate('/teacher-dashboard');
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
          <label>Role</label>
          <select name="role" value={role} onChange={onChange} required>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {role === 'student' ? (
          <div className="form-group">
            <label>Enrollment Number</label>
            <input
              type="text"
              name="enrollment"
              value={enrollment}
              onChange={onChange}
              required
            />
          </div>
        ) : (
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
        )}

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
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
