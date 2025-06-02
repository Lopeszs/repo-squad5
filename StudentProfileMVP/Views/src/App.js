import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { studentsApi } from './services/api';
import {
  AppContainer,
  AppHeader,
  AppMainContent,
  AppFooter
} from './App.styles';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar estudantes da API ao inicializar
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentsApi.getAll();
      console.log('Dados recebidos da API:', data);
      
      if (!data || !Array.isArray(data)) {
        throw new Error('Formato de dados inválido recebido da API');
      }
      
      // Mapear os dados do backend para o formato esperado pelo frontend
      const mappedData = data.map(student => {
        if (!student) return null;
        return {
          id: student.studentID,
          sobrenome: student.lastName || '',
          nome: student.firstName || '',
          idade: student.age || 0,
          curso: student.course || '',
          ano: student.year || ''
        };
      }).filter(Boolean); // Remove itens nulos
      
      console.log('Dados mapeados para o frontend:', mappedData);
      setStudents(mappedData);
    } catch (err) {
      setError('Erro ao carregar estudantes. Verifique se a API está rodando.');
      console.error('Erro ao carregar estudantes:', err);
      // Fallback para dados mockados em caso de erro
      setStudents([
        { id: 1, sobrenome: 'Silva', nome: 'João', idade: 20, curso: 'Ciência da Computação', ano: '3º' },
        { id: 2, sobrenome: 'Santos', nome: 'Maria', idade: 22, curso: 'Engenharia Civil', ano: '4º' },
        { id: 3, sobrenome: 'Oliveira', nome: 'Claudia', idade: 21, curso: 'Medicina', ano: '3º' },
        { id: 4, sobrenome: 'Souza', nome: 'Paulo', idade: 22, curso: 'Direito', ano: '5º' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleStudentSave = async (studentData) => {
    try {
      // Converter do formato do frontend para o formato do backend
      const backendData = {
        studentID: selectedStudent ? parseInt(selectedStudent.id) : 0, // Usar 0 para novos registros
        lastName: studentData.sobrenome,
        firstName: studentData.nome,
        age: parseInt(studentData.idade) || 0, // Garantir que idade seja número
        course: studentData.curso,
        year: studentData.ano
      };

      console.log('Dados enviados para o backend:', backendData);

      if (selectedStudent) {
        // Atualizar estudante existente
        const studentId = parseInt(selectedStudent.id);
        console.log(`Atualizando estudante ID: ${studentId}`, backendData);
        await studentsApi.update(studentId, backendData);
      } else {
        // Criar novo estudante - o backend vai gerar o ID
        console.log('Criando novo estudante:', backendData);
        await studentsApi.create(backendData);
      }
      
      setSelectedStudent(null);
      setError(null); // Limpar mensagens de erro anteriores
      
      // Recarregar a lista após salvar
      await loadStudents();
    } catch (err) {
      const errorMsg = err.response?.data || err.message || 'Erro desconhecido';
      setError('Erro ao salvar estudante: ' + errorMsg);
      console.error('Erro ao salvar estudante:', err);
    }
  };

  const handleStudentDelete = async (studentId) => {
    try {
      console.log(`Deletando estudante ID: ${studentId}`);
      await studentsApi.delete(parseInt(studentId));
      setStudents(prev => prev.filter(s => s.id !== studentId));
      if (selectedStudent && selectedStudent.id === studentId) {
        setSelectedStudent(null);
      }
      setError(null); // Limpar mensagens de erro anteriores
      
      // Recarregar a lista após deletar
      await loadStudents();
    } catch (err) {
      const errorMsg = err.response?.data || err.message || 'Erro desconhecido';
      setError('Erro ao deletar estudante: ' + errorMsg);
      console.error('Erro ao deletar estudante:', err);
    }
  };

  if (loading) {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <AppHeader>
            <h1>Perfil de Estudantes</h1>
          </AppHeader>
          <AppMainContent>
            <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px' }}>
              Carregando estudantes...
            </div>
          </AppMainContent>
        </AppContainer>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <AppHeader>
          <h1>Perfil de Estudantes</h1>
        </AppHeader>
        <AppMainContent>
          {error && (
            <div style={{ 
              backgroundColor: '#ffebee', 
              color: '#c62828', 
              padding: '10px', 
              borderRadius: '4px', 
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <StudentForm
            students={students}
            setStudents={setStudents}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            onSave={handleStudentSave}
            onDelete={handleStudentDelete}
          />
          
          <StudentList
            students={students}
            setSelectedStudent={setSelectedStudent}
            onDelete={handleStudentDelete}
          />
        </AppMainContent>
        <AppFooter>
          <p>Sistema de Perfil de Estudantes - Arquitetura MVP</p>
        </AppFooter>
      </AppContainer>
    </>
  );
}

export default App;