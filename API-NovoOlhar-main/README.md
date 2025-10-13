# 🌿 Novo Olhar API

A **Novo Olhar API** é o back-end oficial da plataforma **Novo Olhar**, um projeto voltado ao apoio de **mulheres em situação de vulnerabilidade**.  
Ela fornece uma **API RESTful** desenvolvida em **Node.js + TypeScript + Express + Prisma (PostgreSQL)**, totalmente documentada via **Swagger**, para integração direta com o front-end e administração via painel.

---

## 🧠 Visão Geral

A API gerencia:
- **Gestores** (usuários administradores)
- **Locais** (pontos de apoio cadastrados)
- **Categorias** (tipos de locais)
- **Carrossel** (banners dinâmicos da página inicial)
- **Autenticação JWT** (para acesso seguro)

Toda a comunicação é feita via **HTTP/JSON**, e o front-end consome os dados diretamente dessa API.

---

## 🏗️ Arquitetura do Sistema

Front-end (React ou Lovable) ⇄ API REST (Express + Swagger + Prisma) ⇄ PostgreSQL

---

## ⚙️ Requisitos

| Ferramenta | Versão recomendada |
|-------------|--------------------|
| Node.js | 18+ (v22.13.0 testado) |
| npm | 9+ |
| PostgreSQL | 13+ |
| Prisma CLI | 5+ |

---

## 🚀 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/MapaInterativohub/API-NovoOlhar/novo-olhar-api.git
cd novo-olhar-api
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o banco de dados
```sql
CREATE DATABASE NovoOlhardb;
```

### 4. Crie o arquivo `.env`
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/NovoOlhardb?schema=public"
JWT_SECRET="sua_chave_jwt_secreta_aqui"
PORT=3001
```

### 5. Execute as migrações Prisma
```bash
npx prisma migrate dev --name init
```

### 6. (Opcional) Popule o banco com dados fictícios
```bash
npx ts-node src/prisma/seed.ts
```

### 7. Inicie o servidor
```bash
npm run dev
```

A API iniciará em http://localhost:3001  
Swagger: http://localhost:3001/docs

---

## 📚 Rotas Principais

| Módulo | Método | Endpoint | Descrição |
|---------|---------|-----------|------------|
| Auth | POST | /api/auth/login | Autentica gestor e retorna JWT |
| Gestores | POST | /api/gestores | Cria novo gestor |
| Gestores | GET | /api/gestores | Lista gestores (requer token) |
| Categorias | GET | /api/categorias | Lista categorias |
| Categorias | POST | /api/categorias | Cria nova categoria |
| Locais | GET | /api/locais | Lista locais cadastrados |
| Locais | GET | /api/locais/:id | Detalha local específico |
| Locais | POST | /api/locais | Cria novo local (requer token) |
| Carrossel | GET | /api/carrossel | Lista slides do carrossel |
| Carrossel | POST | /api/carrossel | Adiciona novo slide (requer token) |

---

## 🔐 Autenticação JWT

Após o login, o sistema retorna um token JWT.  
Use-o no header Authorization:

```http
Authorization: Bearer <seu_token_aqui>
```

---

## 🧩 Integração com o Front-End

O front-end consome as rotas, exibe dados e envia alterações autenticadas.

---

## 🧱 Comunicação com o Banco (Prisma ORM)

Cada tabela do banco é representada por um model Prisma, e os controladores usam o Prisma Client para fazer as operações CRUD.

---

## 🔄 Scripts úteis

| Comando | Descrição |
|----------|------------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento |
| `npx prisma studio` | Abre o painel visual do banco |
| `npx prisma migrate dev` | Executa migrações do banco |
| `npx ts-node src/prisma/seed.ts` | Popula o banco com dados iniciais |

---

## 🧑‍💻 Estrutura de Pastas

```
src/
 ├── controllers/      # Lógica de cada rota
 ├── routes/           # Endpoints e documentação Swagger
 ├── prisma/           # Schema e seed do banco
 ├── middleware/       # Autenticação e validações
 ├── utils/            # Funções auxiliares
 └── server.ts         # Ponto de entrada da aplicação
```

---

## 🌍 Licença

Código aberto — uso livre para fins acadêmicos e sociais.

---

## 💬 Contato e Colaboração

📧 contato@novoolhar.com  
🌐 https://novoolhar.org
