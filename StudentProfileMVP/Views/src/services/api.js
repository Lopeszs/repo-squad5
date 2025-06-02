import axios from 'axios';

// Configuração base da API - ajustando para a porta padrão do .NET (5001 para HTTPS, 5000 para HTTP)
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.request.use(
  (config) => {
    // Configuração para ignorar erros de certificado não é necessária no navegador
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro na API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Serviços para Students
export const studentsApi = {
  // Buscar todos os estudantes
  getAll: async () => {
    try {
      console.log('Buscando todos os estudantes...');
      const response = await api.get('/students');
      console.log('Resposta da API (getAll):', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estudantes:', error.response?.data || error.message);
      throw error;
    }
  },

  // Buscar estudante por ID
  getById: async (id) => {
    try {
      const response = await api.get(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar estudante ${id}:`, error);
      throw error;
    }
  },

  // Criar novo estudante
  create: async (student) => {
    try {
      console.log('Enviando para API:', student);
      const response = await api.post('/students', student);
      console.log('Resposta da API:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar estudante:', error.response?.data || error.message);
      throw error;
    }
  },

  // Atualizar estudante
  update: async (id, student) => {
    try {
      console.log(`Atualizando estudante ID: ${id}`, student);
      const response = await api.put(`/students/${id}`, student);
      console.log('Resposta da API (update):', response.data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar estudante ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  // Deletar estudante
  delete: async (id) => {
    try {
      console.log(`Deletando estudante ID: ${id}`);
      const response = await api.delete(`/students/${id}`);
      console.log('Resposta da API (delete):', response.status);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar estudante ${id}:`, error.response?.data || error.message);
      throw error;
    }
  }
};

export default api;