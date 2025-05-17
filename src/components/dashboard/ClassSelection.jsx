// src/components/dashboard/ClassSelection.jsx
import React from 'react';
import { classOptions, sectionOptions } from '../../data/studentData';

const ClassSelection = ({ 
  selectedClass, 
  selectedSection, 
  handleClassChange, 
  handleSectionChange, 
  handleViewStudents 
}) => {
  return (
    <div className="class-selection-container">
      <h3 className="selection-title">Select Class and Section</h3>
      <div className="selection-controls">
        <div className="selection-group">
          <label htmlFor="classSelect">Class:</label>
          <select 
            id="classSelect" 
            value={selectedClass} 
            onChange={handleClassChange}
            className="selection-dropdown"
          >
            <option value="">Select Class</option>
            {classOptions.map(classOption => (
              <option key={classOption} value={classOption}>{classOption}</option>
            ))}
          </select>
        </div>
        
        <div className="selection-group">
          <label htmlFor="sectionSelect">Section:</label>
          <select 
            id="sectionSelect" 
            value={selectedSection} 
            onChange={handleSectionChange}
            className="selection-dropdown"
            disabled={!selectedClass}
          >
            <option value="">Select Section</option>
            {selectedClass && sectionOptions.map(sectionOption => (
              <option key={sectionOption} value={sectionOption}>{sectionOption}</option>
            ))}
          </select>
        </div>
        
        <button 
          className="view-students-btn"
          onClick={handleViewStudents}
          disabled={!selectedClass || !selectedSection}
        >
          View Students
        </button>
      </div>
    </div>
  );
};

export default ClassSelection;