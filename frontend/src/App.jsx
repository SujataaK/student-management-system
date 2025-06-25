import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './components/StudentList';
import { StudentProvider } from './context/StudentContext';
import Navbar from './components/Navbar';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';



function App() {
    const [searchTerm, setSearchTerm] = useState('');
    


  return (
    <>
    <StudentProvider>
      <Router>
        <Navbar 
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        />
        <Routes>
          <Route path="/" element= {<StudentList searchTerm={searchTerm}/>} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/update/:id" element={<UpdateStudent />} />

        </Routes>
      </Router>
      </StudentProvider>
    </>
  )
}

export default App
