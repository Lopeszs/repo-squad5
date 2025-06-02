import React from 'react';
import {
  ListContainer,
  ListTitle,
  StyledTable,
  TableHeader,
  TableCell,
  TableRow
} from './StudentList.styles';

function StudentList({ students, setSelectedStudent, onDelete }) {
  const handleRowClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <ListContainer>
      <ListTitle>Lista de Alunos</ListTitle>
      <StyledTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Sobrenome</TableHeader>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Idade</TableHeader>
            <TableHeader>Curso</TableHeader>
            <TableHeader>Ano</TableHeader>
          </tr>
        </thead>
        <tbody>
          {students && students.length > 0 ? (
            students.map((s) => (
              <TableRow key={s.id} onClick={() => handleRowClick(s)}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.sobrenome || ''}</TableCell>
                <TableCell>{s.nome || ''}</TableCell>
                <TableCell>{s.idade || ''}</TableCell>
                <TableCell>{s.curso || ''}</TableCell>
                <TableCell>{s.ano || ''}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} style={{ textAlign: 'center' }}>
                Nenhum aluno cadastrado
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </StyledTable>
    </ListContainer>
  );
}

export default StudentList;
