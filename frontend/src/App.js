import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './App.css';

function App() {
  const [students, setStudents] = useState([
    { id: 1, sobrenome: 'Silva', nome: 'João', idade: 20, curso: 'Ciência da Computação', ano: '3º' },
    { id: 2, sobrenome: 'Santos', nome: 'Maria', idade: 22, curso: 'Engenharia Civil', ano: '4º' },
    { id: 3, sobrenome: 'Oliveira', nome: 'Claudia', idade: 21, curso: 'Medicina', ano: '3º' },
    { id: 4, sobrenome: 'Souza', nome: 'Paulo', idade: 22, curso: 'Direito', ano: '5º' },
  ]);

  return (
    <div className="container">
      <h1>Sistema de Perfil de Estudantes</h1>
      <div className="main">
        <StudentForm setStudents={setStudents} students={students} />
        <StudentList students={students} />
      </div>
    </div>
  );
}

export default App;
