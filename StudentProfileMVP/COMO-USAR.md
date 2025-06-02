# 🚀 Como Usar o Student Profile MVP

## Início Rápido

### 1. Instalação das Dependências

```bash
# Instalar dependências do backend (.NET)
dotnet restore

# Instalar dependências do frontend (React)
cd Views
npm install
cd ..
```

### 2. Executar a Aplicação

#### Opção A: Script Automático (Recomendado)
```bash
# Windows
start-dev.bat
```

#### Opção B: Manual
```bash
# Terminal 1 - Backend
dotnet run

# Terminal 2 - Frontend
cd Views
npm start
```

### 3. Acessar a Aplicação

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Swagger/OpenAPI**: http://localhost:5000/swagger

## 📋 Funcionalidades Disponíveis

### ✅ Cadastro de Estudantes
- Preencha o formulário com os dados do estudante
- Clique em "ADICIONAR" para salvar

### ✅ Edição de Estudantes
- Clique em qualquer linha da tabela para selecionar
- Modifique os dados no formulário
- Clique em "SALVAR" para confirmar

### ✅ Exclusão de Estudantes
- Selecione um estudante na tabela
- Clique em "EXCLUIR" no formulário

### ✅ Listagem de Estudantes
- Todos os estudantes aparecem automaticamente na tabela
- Dados são carregados da API em tempo real

## 🔧 Solução de Problemas

### Problema: "Erro ao carregar estudantes"
**Solução**: Verifique se o backend está rodando na porta 5000

### Problema: CORS Error
**Solução**: O CORS já está configurado. Reinicie o backend se necessário

### Problema: Dependências não instaladas
**Solução**: Execute `dotnet restore` e `npm install` na pasta Views

## 📊 Arquitetura

Este projeto segue o padrão **MVP (Model-View-Presenter)**:

- **Model**: `Models/Student.cs` + `Data/StudentRepository.cs`
- **View**: `Views/src/` (React Components)
- **Presenter**: `Presenters/StudentsController.cs` + `Presenters/StudentService.cs`

## 🎯 Próximos Passos

1. Testar todas as funcionalidades CRUD
2. Verificar integração frontend-backend
3. Validar persistência no banco SQLite
4. Explorar a documentação da API no Swagger

---

**Integração concluída com sucesso!** 🎉
