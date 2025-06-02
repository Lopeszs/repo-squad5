import styled from 'styled-components';

export const FormContainer = styled.div`
  background-color: #000000;
  color: #e0e0e0;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
  flex-shrink: 0;
`;

export const FormTitle = styled.h2`
  color: #99ccff;
  margin-top: 0;
  border-bottom: 1px solid #99ccff;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: calc(100% - 16px); /* Account for padding */
  padding: 8px;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #f0f0f0;
  color: #000;
  &:disabled {
    background-color: #ccc;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f; /* Red for errors */
  font-size: 0.875em;
  margin-top: 5px;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-weight: bold;

  &.btn-add { background-color: #007bff; }
  &.btn-save { background-color: #28a745; }
  &.btn-delete { background-color: #dc3545; }
  &.btn-clear { background-color: #6c757d; }
`;
