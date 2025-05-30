import styled from 'styled-components';

export const ListContainer = styled.div`
  background-color: #ffffff; /* White background */
  padding: 20px;
  border-radius: 8px;
  flex-grow: 1; /* List takes remaining space */
  overflow-x: auto; /* Add scroll if table is too wide */
`;

export const ListTitle = styled.h2`
  color: #003366; /* Dark blue for "Lista de Alunos" */
  margin-top: 0;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #000000; /* Black header for table */
  color: #99ccff; /* Light blue text for table header */
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

export const TableRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5; /* Light hover effect */
  }
`;
