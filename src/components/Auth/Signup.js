import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <div className="role-selection">
        <div className="role-card">
          <h3>I am a Student</h3>
          <p>Access courses, submit assignments, and track your progress</p>
          <Link to="/signup/student" className="btn btn-primary">
            Student Sign Up
          </Link>
        </div>
        <div className="role-card">
          <h3>I am a Teacher</h3>
          <p>Create courses, manage assignments, and interact with students</p>
          <Link to="/signup/teacher" className="btn btn-secondary">
            Teacher Sign Up
          </Link>
        </div>
      </div>
      <p>
        Already have an account?{' '}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;