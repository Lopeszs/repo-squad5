import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, sobrenome: 'Silva', nome: 'João', idade: 20, curso: 'Ciência da Computação', ano: '3º' },
    { id: 2, sobrenome: 'Santos', nome: 'Maria', idade: 22, curso: 'Engenharia Civil', ano: '4º' },
    { id: 4, sobrenome: 'Oliveira', nome: 'Claudia', idade: 21, curso: 'Medicina', ano: '3º' }, // ID updated to 4 as per image
    { id: 5, sobrenome: 'Souza', nome: 'Paulo', idade: 22, curso: 'Direito', ano: '5º' },   // ID updated to 5 as per image
  ]);

  // TODO: Implement add, update, delete, clear functions here
  // const addStudent = (student) => { ... };
  // const updateStudent = (student) => { ... };
  // const deleteStudent = (id) => { ... };
  // const clearForm = () => { ... };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Perfil de Estudantes</h1>
      </header>
      <main className="app-main-content">
        <div className="student-form-container">
          <StudentForm setStudents={setStudents} students={students} />
        </div>
        <div className="student-list-container">
          <StudentList students={students} />
        </div>
      </main>
      <footer className="app-footer">
        <p>Sistema de Perfil de Estudantes - Migrado de VB6 para Web</p>
      </footer>
    </div>
  );
}

export default App;
