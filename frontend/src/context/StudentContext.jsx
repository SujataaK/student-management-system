import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  // Fetch students from backend
  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Failed to fetch students', err);
    }
  };

  // Call fetch on mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Add student and refresh
  const addStudent = async (data) => {
    try {
      const res = await axios.post('http://localhost:5000/students', data);
      setStudents([...students, res.data]); // Add to local state
      return { success: true };
    } catch (err) {
      console.error('Add failed:', err.response?.data || err.message);
      return { success: false, message: err.response?.data?.error || 'Failed to add student' };
    }
  };

  const updateStudent = async (id, data) => {
    try {
      const res = await axios.put(`http://localhost:5000/students/${id}`, data);
      setStudents(
        students.map((student) => (student._id === id ? res.data : student))
      );
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  return (
    <StudentContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
};
