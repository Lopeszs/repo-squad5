import React from 'react';
import {
  ListContainer,
  ListTitle,
  StyledTable,
  TableHeader,
  TableCell,
  TableRow
} from './StudentList.styles';

function StudentList({ students, setSelectedStudent }) {
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
          {students.map((student) => (
            <TableRow key={student.studentId} onClick={() => handleRowClick(student)}>
              <TableCell>{student.studentId}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.course}</TableCell>
              <TableCell>{student.year}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </ListContainer>
  );
}

export default StudentList;
