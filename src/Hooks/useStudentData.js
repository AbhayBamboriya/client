// src/hooks/useStudentData.js
import { useState, useEffect } from 'react';
import { studentData } from '../data/studentData';

export const useStudentData = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [showStudents, setShowStudents] = useState(false);
  
  // Get current students based on selected class and section
  const getCurrentStudents = () => {
    if (selectedClass && selectedSection && studentData[selectedClass] && studentData[selectedClass][selectedSection]) {
      return studentData[selectedClass][selectedSection];
    }
    return [];
  };
  
  const currentStudents = getCurrentStudents();

  // Handle class selection change
  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSection('');
    setShowStudents(false);
  };

  // Handle section selection change
  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
    setShowStudents(false);
  };
  
  // Handle view students button click
  const handleViewStudents = () => {
    if (selectedClass && selectedSection) {
      setShowStudents(true);
    }
  };

  return {
    selectedClass,
    setSelectedClass,
    selectedSection,
    setSelectedSection,
    showStudents,
    setShowStudents,
    currentStudents,
    handleClassChange,
    handleSectionChange,
    handleViewStudents
  };
};