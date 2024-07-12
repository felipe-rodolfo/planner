```markdown
# Projeto de Planejamento de Viagens

Este projeto é uma API para gerenciar viagens, participantes, atividades e links relacionados, utilizando o framework Fastify e o ORM Prisma.

## Sumário

- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Rotas da API](#rotas-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:
   ```env
   DATABASE_URL="sqlite://./database.db"
   API_BASE_URL="http://localhost:3000"
   WEB_BASE_URL="http://localhost:3000"
   PORT=3333
   ```

2. Execute as migrações do Prisma para criar o banco de dados:
   ```bash
   npx prisma migrate dev --name init
   ```

## Execução

Para iniciar o servidor em modo de desenvolvimento, utilize o comando:
```bash
npm run dev
```

## Rotas da API

### Viagens

- **Criar uma viagem**
  ```http
  POST /trips
  ```
  **Body:**
  ```json
  {
    "destination": "string",
    "starts_at": "date",
    "ends_at": "date",
    "owner_name": "string",
    "owner_email": "string",
    "emails_to_invite": ["string"]
  }
  ```

- **Confirmar uma viagem**
  ```http
  GET /trips/:tripId/confirm
  ```

- **Atualizar uma viagem**
  ```http
  PUT /trips/:tripId
  ```
  **Body:**
  ```json
  {
    "destination": "string",
    "starts_at": "date",
    "ends_at": "date"
  }
  ```

- **Obter detalhes de uma viagem**
  ```http
  GET /trips/:tripId
  ```

### Participantes

- **Confirmar um participante**
  ```http
  GET /participants/:participantId/confirm
  ```

- **Obter detalhes de um participante**
  ```http
  GET /participants/:participantId
  ```

- **Obter lista de participantes de uma viagem**
  ```http
  GET /trips/:tripId/participants
  ```

### Atividades

- **Criar uma atividade**
  ```http
  POST /trips/:tripId/activities
  ```
  **Body:**
  ```json
  {
    "title": "string",
    "accours_at": "date"
  }
  ```

- **Obter atividades de uma viagem**
  ```http
  GET /trips/:tripId/activities
  ```

### Links

- **Criar um link**
  ```http
  POST /trips/:tripId/links
  ```
  **Body:**
  ```json
  {
    "title": "string",
    "url": "string"
  }
  ```

- **Obter links de uma viagem**
  ```http
  GET /trips/:tripId/links
  ```

### Convites

- **Criar um convite**
  ```http
  POST /trips/:tripId/invites
  ```
  **Body:**
  ```json
  {
    "email": "string"
  }
  ```

## Estrutura do Projeto

```bash
.
├── src
│   ├── routes
│   │   ├── create-trips.ts
│   │   ├── confirm-trip.ts
│   │   ├── confirm-participant.ts
│   │   ├── create-activity.ts
│   │   ├── get-activities.ts
│   │   ├── create-link.ts
│   │   ├── get-links.ts
│   │   ├── get-participant.ts
│   │   ├── get-participants.ts
│   │   ├── create-invite.ts
│   │   ├── update-trip.ts
│   │   ├── get-trip-details.ts
│   ├── lib
│   │   ├── prisma.ts
│   │   ├── dayjs.ts
│   │   ├── mail.ts
│   ├── errors
│   │   └── client-error.ts
│   ├── env.ts
│   ├── error-handler.ts
│   ├── server.ts
├── prisma
│   └── schema.prisma
├── package.json
└── tsconfig.json
```

## Contribuição

1. Fork este repositório
2. Crie uma branch (`git checkout -b feature-nova-funcionalidade`)
3. Comite suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature-nova-funcionalidade`)
5. Crie um novo Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT.
```