# Student Profile MVP

Sistema de gerenciamento de perfis de estudantes implementado seguindo a arquitetura **Model-View-Presenter (MVP)**.

## 📋 Índice

- [Arquitetura](#arquitetura)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração e Execução](#configuração-e-execução)
- [API Endpoints](#api-endpoints)
- [Funcionalidades](#funcionalidades)
- [Banco de Dados](#banco-de-dados)

## 🏗️ Arquitetura

Este projeto segue o padrão arquitetural **MVP (Model-View-Presenter)**, que separa as responsabilidades em três camadas distintas:

### Model (Modelo)
- **Localização**: `Models/`
- **Responsabilidade**: Representa os dados e a lógica de negócio
- **Arquivos**: `Student.cs`

### View (Visão)
- **Localização**: `Views/`
- **Responsabilidade**: Interface do usuário (React Frontend)
- **Arquivos**: Componentes React para exibição e interação

### Presenter (Apresentador)
- **Localização**: `Presenters/`
- **Responsabilidade**: Mediação entre Model e View, lógica de apresentação
- **Arquivos**: `StudentsController.cs`, `StudentService.cs`

## 📁 Estrutura do Projeto

```
StudentProfileMVP/
├── Models/                     # 📊 Modelos de Dados
│   └── Student.cs
├── Views/                      # 🎨 Frontend React
│   ├── src/
│   │   ├── App.js
│   │   ├── components/
│   │   │   ├── StudentForm.js
│   │   │   └── StudentList.js
│   │   └── services/
│   │       └── api.js         # Serviços de API
│   ├── package.json
│   └── public/
├── Presenters/                 # 🎯 Camada de Apresentação
│   ├── StudentsController.cs   # API Controller
│   └── StudentService.cs       # Serviços de negócio
├── Data/                       # 💾 Camada de Dados
│   ├── StudentRepository.cs    # Repositório principal
│   └── MockStudentRepository.cs # Repositório mock
├── Database/                   # 🗄️ Banco de Dados
│   ├── students_cleaned.db     # SQLite Database
│   └── Migrator/              # Scripts de migração
├── Program.cs                  # 🚀 Configuração da aplicação
├── appsettings.json           # ⚙️ Configurações
├── start-dev.bat              # 🔧 Script de desenvolvimento
└── StudentProfile.NET.csproj  # 📦 Projeto .NET
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **ASP.NET Core 8.0** - Framework web
- **SQLite** - Banco de dados
- **Entity Framework Core** - ORM
- **Swagger/OpenAPI** - Documentação da API

### Frontend
- **React 18** - Biblioteca JavaScript
- **Styled Components** - CSS-in-JS
- **Axios** - Cliente HTTP para API calls

## ⚙️ Configuração e Execução

### Pré-requisitos
- .NET 8.0 SDK
- Node.js 16+
- npm ou yarn

### 1. Executar o Backend (.NET)

```bash
# Na raiz do projeto
dotnet restore
dotnet run
```

A API estará disponível em: `https://localhost:5001` ou `http
