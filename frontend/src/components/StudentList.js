import React from 'react';

function StudentList({ students }) {
  return (
    <div className="list">
      <h2>Lista de Alunos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sobrenome</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Curso</th>
            <th>Ano</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.sobrenome}</td>
              <td>{s.nome}</td>
              <td>{s.idade}</td>
              <td>{s.curso}</td>
              <td>{s.ano}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
