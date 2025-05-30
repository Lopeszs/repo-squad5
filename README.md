# Student Profile API

Esta é uma API RESTful desenvolvida em ASP.NET Core 9 que migra a funcionalidade do sistema Student Profile originalmente desenvolvido em VB6.

## Estrutura do Projeto

- **Models**: Contém a classe `Student` que representa a entidade principal do sistema
- **Data**: Contém o repositório mockado que simula o banco de dados
- **Services**: Contém a lógica de negócios
- **Controllers**: Contém os endpoints da API

## Endpoints da API

- `GET /api/students`: Retorna todos os estudantes
- `GET /api/students/{id}`: Retorna um estudante específico pelo ID
- `POST /api/students`: Adiciona um novo estudante
- `PUT /api/students/{id}`: Atualiza um estudante existente
- `DELETE /api/students/{id}`: Remove um estudante

## Como Executar

1. Certifique-se de ter o .NET 9.0 SDK instalado
2. Navegue até a pasta do projeto
3. Execute o comando: `dotnet run`
4. Acesse a API em: `https://localhost:5001/api/students`
5. A documentação Swagger está disponível em: `https://localhost:5001/swagger`

## Recursos do .NET 9 Utilizados

- Namespaces de arquivo
- Collection literals (inicialização de coleções com sintaxe simplificada)
- Required properties
- Nullable reference types
- Top-level statements
- Injeção de dependência nativa

## Migração do VB6 para .NET

Esta API implementa as mesmas funcionalidades do sistema original em VB6, mas com uma arquitetura moderna:

- Arquitetura em camadas (Controllers, Services, Repositories)
- API RESTful seguindo as melhores práticas
- Documentação via Swagger
- Validação de dados
- Tratamento de erros

Os dados são mockados em memória, mas podem ser facilmente substituídos por uma implementação real de banco de dados.