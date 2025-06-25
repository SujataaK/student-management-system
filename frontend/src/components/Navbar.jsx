import React from 'react';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4">
      <a className="navbar-brand" href="/">
        Student Management System
      </a>

      <div className="ms-auto" style={{ maxWidth: '300px', width: '100%' }}>
        <input
          type="search"
          className="form-control"
          placeholder="Search by name or course"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
