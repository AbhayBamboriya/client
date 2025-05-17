// src/hooks/useAttendance.js
import { useState, useEffect } from 'react';
import { getCurrentDate } from '../utils/helpers';

export const useAttendance = (currentStudents) => {
  const [attendanceMode, setAttendanceMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [attendanceData, setAttendanceData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  const [attendanceInitialized, setAttendanceInitialized] = useState(false);

  // Initialize attendance data when students or date changes
  useEffect(() => {
    if (currentStudents.length > 0 && !attendanceInitialized) {
      const initialAttendance = {};
      currentStudents.forEach(student => {
        initialAttendance[student.id] = { status: 'present', remarks: '' };
      });
      setAttendanceData(initialAttendance);
      setAttendanceInitialized(true);
    }
  }, [currentStudents, attendanceInitialized]);

  // Reset attendance initialized flag when date changes
  useEffect(() => {
    setAttendanceInitialized(false);
  }, [selectedDate]);

  // Fetch existing attendance data when entering attendance mode
  useEffect(() => {
    if (attendanceMode && currentStudents.length > 0) {
      fetchAttendanceData();
    }
  }, [attendanceMode, currentStudents]);

  // Function to fetch attendance data from the server
  const fetchAttendanceData = async () => {
    try {
      // This would be a real API call in production
      console.log('Fetching attendance data for:', { date: selectedDate });
      setAttendanceInitialized(true);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  // Toggle attendance mode
  const toggleAttendanceMode = () => {
    setAttendanceMode(!attendanceMode);
  };

  // Handle date change for attendance
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setAttendanceInitialized(false);
  };

  // Handle attendance status change
  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], status }
    }));
  };

  // Handle remarks change
  const handleRemarksChange = (studentId, remarks) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], remarks }
    }));
  };

  // Submit attendance data to server
  const submitAttendance = async (selectedClass, selectedSection) => {
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      // Prepare attendance data for submission
      const attendancePayload = {
        class: selectedClass,
        section: selectedSection,
        date: selectedDate,
        attendance: attendanceData,
        students: currentStudents.map(student => ({
          id: student.id,
          name: student.name,
          rollNo: student.rollNo
        }))
      };

      // Simulate API call
      console.log('Submitting attendance data:', attendancePayload);
      
      // Simulate successful submission
      setTimeout(() => {
        setSubmitMessage({ 
          type: 'success', 
          text: 'Attendance submitted successfully!' 
        });
        
        // Exit attendance mode after successful submission
        setTimeout(() => {
          setAttendanceMode(false);
          setSubmitMessage({ type: '', text: '' });
        }, 2000);
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting attendance:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Failed to submit attendance. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    attendanceMode,
    selectedDate,
    attendanceData,
    isSubmitting,
    submitMessage,
    toggleAttendanceMode,
    handleDateChange,
    handleAttendanceChange,
    handleRemarksChange,
    submitAttendance
  };
};