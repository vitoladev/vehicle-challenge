# Vehicle Challenge
Desafio de cadastro de veiculos com Node.js e Angular


## Backend
O backend utiliza Fastify, Drizzle ORM, banco de dados PostgreSQL, Zod para validação das requisições e Mocha para os testes
```
server/
├── src/
│   ├── modules/
│   │   ├── vehicles/
|   |       ├── vehicle.controller.ts -> camada responsável por receber as requisições HTTP
|   |       ├── vehicle.errors.ts -> trata os erros específicos de cada request
|   |       ├── vehicle.schema.ts -> validação dos campos do veículo para garantir que os dados estão corretos
|   |       ├── services/ -> Serviços responsáveis por tratar cada caso de uso (Create, Update, Delete, FindById, FindAll)
|   |           ├── __tests__ -> Testes específicos para cada requisição do recurso "/vehicles"
│   ├── common/ -> 
│   │   ├── db -> configurações do banco de dados como schemas e migrations
│   │   ├── plugins -> configurações de plugins do fastify como a conexão do banco de dados e o shutdown da aplicação
│   │   ├── errors -> tratamento de erros da aplicação
│   ├── app.ts -> Configuração do fastify
│   ├── main.ts -> Entrypoint da aplicação
├── tests/
│   ├── vehicle.ts -> Utilitarios para criação de veiculos nos testes
```