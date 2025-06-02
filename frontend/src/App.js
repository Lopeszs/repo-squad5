import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import {
  AppContainer,
  AppHeader,
  AppMainContent,
  AppFooter
} from './App.styles';
// import './App.css'; // App.css will be removed or emptied

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0; /* Light gray background for the page */
  }
`;

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/Students');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
        // Optionally, set an error state here to display to the user
      }
    };

    fetchStudents();
  }, []);


  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
          <h1>Perfil de Estudantes</h1>
        </AppHeader>
        <AppMainContent>
          {/* StudentForm now contains its own FormContainer styled component */}
          <StudentForm
            students={students}
            setStudents={setStudents}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
          {/* StudentList will be wrapped in its own styled container or use one defined here */}
          <StudentList
            students={students}
            setSelectedStudent={setSelectedStudent}
            // Pass setStudents if delete/edit actions are to be initiated from list directly in future
          />
        </AppMainContent>
        <AppFooter>
          <p>Sistema de Perfil de Estudantes - Migrado de VB6 para Web</p>
        </AppFooter>
      </AppContainer>
    </>
  );
}

export default App;
