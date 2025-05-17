
// src/utils/helpers.js
export function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  // Helper function to determine progress bar class
  export const getProgressClass = (value) => {
    if (value > 90) return 'progress-excellent';
    if (value > 80) return 'progress-good';
    if (value > 70) return 'progress-average';
    return 'progress-needs-improvement';
  };