import React, { useContext } from 'react';
import { StudentContext } from '../context/StudentContext';
import { useNavigate } from 'react-router-dom';

const StudentList = ({ searchTerm = '' }) => {
  const { students, deleteStudent } = useContext(StudentContext);
  const navigate = useNavigate();

  // Filter students based on searchTerm (case-insensitive)
  const filteredStudents = students.filter((s) => {
    const name = s?.name?.toLowerCase() || '';
    const course = s?.course?.toLowerCase() || '';
    return (
      name.includes(searchTerm.toLowerCase()) ||
      course.includes(searchTerm.toLowerCase())
    );
  });

  // Debug logs
  console.log('Search Term:', searchTerm);
  console.log('Filtered Students:', filteredStudents);

  return (
    <div className="container-fluid px-3 px-lg-4 mt-4">
      <div className="row align-items-center mb-3 g-2">
        <div className="col">
          <h4 className="m-0">Students</h4>
        </div>

        <div className="col-auto">
          <button
            className="btn btn-primary btn-sm d-inline-flex align-items-center"
            onClick={() => navigate('/add')}
          >
            <i className="bi bi-plus-lg me-1" /> Add New
          </button>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="text-center fs-6">No students found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th className="min-w-150">Name</th>
                <th className="min-w-200">Email</th>
                <th style={{ width: 70 }}>Age</th>
                <th className="min-w-150">Course</th>
                <th style={{ width: 150 }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((st) => (
                <tr key={st._id}>
                  <td>{st.name}</td>
                  <td className="text-break">{st.email}</td>
                  <td>{st.age}</td>
                  <td>{st.course}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning btn-sm flex-fill"
                        onClick={() => navigate(`/update/${st._id}`)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm flex-fill"
                        onClick={() => {
                          if (window.confirm(`Delete ${st.name}?`))
                            deleteStudent(st._id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
