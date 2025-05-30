import React, { useState } from 'react';
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
  const [students, setStudents] = useState([
    // Ensure IDs are strings to match Zod schema if it expects string IDs
    { id: '1', sobrenome: 'Silva', nome: 'João', idade: 20, curso: 'Ciência da Computação', ano: '3º' },
    { id: '2', sobrenome: 'Santos', nome: 'Maria', idade: 22, curso: 'Engenharia Civil', ano: '4º' },
    { id: '4', sobrenome: 'Oliveira', nome: 'Claudia', idade: 21, curso: 'Medicina', ano: '3º' },
    { id: '5', sobrenome: 'Souza', nome: 'Paulo', idade: 22, curso: 'Direito', ano: '5º' },
  ]);
  const [selectedStudent, setSelectedStudent] = useState(null);


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
