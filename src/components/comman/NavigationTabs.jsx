// src/components/common/NavigationTabs.jsx
import React from 'react';

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="nav-tabs">
      <button 
        className={`tab-button ${activeTab === 'students' ? 'active' : ''}`}
        onClick={() => setActiveTab('students')}
      >
        Students
      </button>
      <button 
        className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
        onClick={() => setActiveTab('calendar')}
      >
        Calendar
      </button>
      <button 
        className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
        onClick={() => setActiveTab('reports')}
      >
        Reports
      </button>
    </div>
  );
};

export default NavigationTabs;