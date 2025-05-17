import React, { useState } from 'react';
import './SlideBar.css'; 
import { FiMenu } from 'react-icons/fi';

// import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
    // const dispatch=useDispatch()
    const navigate=useNavigate()
    // const role=useSelector((state)=>state?.auth?.role)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const logout=()=>{
    // return 
    navigate("/")
  }
  
  return (
    <>
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            // transition: Bounce
        />
      <button onClick={toggleSidebar} className="sidebar-toggle">
        {isOpen ? (
          <span className="close-icon">&times;</span> // Cross icon
        ) : (
          <FiMenu/>
        )}
      </button>
      <div className={`sidebar ${isOpen ? 'open' : 'close'}`}>
      <button onClick={toggleSidebar} className="sidebar-toggle">
        {isOpen ? (
          <span className="close-icon">&times;</span> // Cross icon
        ) : (
          'Open Sidebar'
        )}
      </button>
        <ul>
          {/* {
              role!="teacher" &&
            <li><h2 onClick={()=>navigate('/askDoubt')}>Ask Doubt</h2></li>
          }
          <li><h2 onClick={()=>navigate('/allDoubts')}>All Doubts</h2></li>
          <li><h2  onClick={()=>navigate('/resource')}>Resources</h2></li>
          
          {
            role=="teacher" && 
            <li><h2 onClick={()=>navigate('/upload')}>Upload Resources</h2></li>
          } */}
          <li>
            <h2 onClick={logout}>Logout</h2>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
