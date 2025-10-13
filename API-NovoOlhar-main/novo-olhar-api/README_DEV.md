# 🧑‍💻 README_DEV.md — Documentação Técnica da Novo Olhar API

Este documento descreve a **arquitetura interna**, **fluxo de execução**, **organização de pastas** e **boas práticas de desenvolvimento** da API **Novo Olhar**, voltada ao apoio de mulheres em situação de vulnerabilidade.

---

## 🏗️ Arquitetura e Camadas

A API segue o padrão **MVC simplificado**, com separação clara entre responsabilidades:

```
src/
 ├── controllers/      → Lógica de negócio e comunicação com o Prisma
 ├── routes/           → Definição das rotas e documentação Swagger
 ├── prisma/           → Modelagem do banco e scripts de seed
 ├── middleware/       → Autenticação, validações e middlewares globais
 ├── utils/            → Funções auxiliares
 └── server.ts         → Ponto de entrada principal
```

### Fluxo geral de requisição

```
Cliente → Rota (Express) → Controller → Prisma ORM → PostgreSQL
                                ↓
                          Middleware (JWT)
```

---

## ⚙️ Server.ts

Arquivo principal da aplicação.  
Ele é responsável por inicializar o servidor Express, conectar ao banco via Prisma e carregar as rotas com documentação Swagger.

Principais responsabilidades:
- Configurar o CORS e body-parser;
- Importar e montar as rotas (`/api/*`);
- Registrar o Swagger UI (`/docs`);
- Escutar na porta definida em `process.env.PORT`.

---

## 🧩 Controllers

Os controllers contêm a lógica principal de cada módulo.  
Cada função dentro de um controller representa uma operação específica (CRUD).

Exemplo simplificado (`local.controller.ts`):

```ts
export const listLocais = async (req, res) => {
  try {
    const locais = await prisma.local.findMany({
      include: { categoria: true, gestor: true }
    });
    res.status(200).json(locais);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar locais" });
  }
};
```

### Boas práticas
- Sempre utilizar `try/catch` para evitar que exceções interrompam o fluxo.  
- Retornar mensagens de erro padronizadas.  
- Nunca expor campos sensíveis (ex.: senha, token, CPF).

---

## 🔒 Middlewares

Os middlewares permitem interceptar requisições antes de chegarem ao controller.  
O principal middleware é o **`ensureAuth`**, responsável por validar o token JWT.

Exemplo (`ensureAuth.ts`):
```ts
import jwt from "jsonwebtoken";

export const ensureAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Token ausente" });

  const [, token] = authHeader.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
};
```

Rotas protegidas devem incluir `ensureAuth` antes do controller.

---

## 🗃️ Prisma ORM e Banco de Dados

O Prisma atua como camada de abstração sobre o PostgreSQL.  
O schema do banco está em `prisma/schema.prisma` e contém os modelos `Gestor`, `Local`, `Categoria` e `Carrossel`.

### Comandos principais

| Ação | Comando |
|------|----------|
| Aplicar migrações | `npx prisma migrate dev --name init` |
| Executar seed | `npx ts-node src/prisma/seed.ts` |
| Abrir painel visual | `npx prisma studio` |

### Expansão do banco

Para criar novas tabelas:
1. Edite `prisma/schema.prisma` e adicione o novo `model`;
2. Rode `npx prisma migrate dev --name nome_da_migracao`;
3. O Prisma Client será atualizado automaticamente.

---

## 🧰 Swagger (Documentação Automática)

A documentação está configurada em `swagger.ts` e integrada às rotas por meio de comentários JSDoc.

Exemplo:

```ts
/**
 * @swagger
 * /api/locais:
 *   get:
 *     tags: [Locais]
 *     description: Lista todos os locais cadastrados
 *     responses:
 *       200:
 *         description: Sucesso
 */
```

A interface é acessível em:
👉 `http://localhost:3001/docs`

---

## 🔐 Autenticação e Segurança

A autenticação é baseada em **JWT (JSON Web Token)**.  
Cada login gera um token assinado com a variável `JWT_SECRET` do `.env`.

Fluxo de autenticação:
1. O gestor realiza login via `/api/auth/login`.
2. A API valida email/senha, gera um token e retorna ao cliente.
3. O token deve ser enviado em `Authorization: Bearer <token>`.

Boas práticas:
- Use `bcryptjs` para hashing de senhas.
- Expire tokens após tempo razoável (ex.: 24h).
- Nunca armazene senhas em texto plano.

---

## 🧪 Testes e Desenvolvimento

Embora o projeto não inclua testes automatizados por padrão, recomenda-se o uso do **Jest** para testar controllers e middlewares.

Exemplo de estrutura sugerida:
```
tests/
 ├── auth.test.ts
 ├── local.test.ts
 ├── categoria.test.ts
 └── gestor.test.ts
```

Comando para rodar testes (caso adicionados):
```bash
npm test
```

---

## 🧱 Padrão de Código

O projeto segue o padrão **Airbnb JavaScript Style Guide**, com algumas adaptações.  
Sugestões:
- Use `camelCase` para variáveis e funções.
- Sempre tipar parâmetros e retornos.
- Evite lógica de negócio dentro das rotas.

---

## ⚙️ Adicionando Novos Módulos

Para criar um novo módulo (exemplo: Notícias):
1. Criar `src/controllers/noticia.controller.ts` com funções CRUD;
2. Criar `src/routes/noticia.routes.ts` com as rotas e anotações Swagger;
3. Importar no `server.ts`;
4. Atualizar o banco se necessário (Prisma);
5. Testar e documentar no Swagger.

---

## 🧭 Convenções de Commit

| Tipo | Descrição |
|------|------------|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `docs:` | Alterações em documentação |
| `refactor:` | Refatoração de código existente |
| `chore:` | Tarefas de build, dependências, etc |

Exemplo:
```
feat: adicionar campo "ativo" ao model Carrossel
```

---

## 🧩 Comunicação com o Front-End

A comunicação entre o front e a API ocorre via **fetch/axios**, utilizando JSON.

Exemplo de requisição:
```js
const token = localStorage.getItem("token");

const res = await fetch("http://localhost:3001/api/locais", {
  headers: { Authorization: `Bearer ${token}` },
});
const locais = await res.json();
```

Os dados retornados seguem o mesmo formato definido pelos models Prisma.

---

## 🧠 Conclusão

A **Novo Olhar API** foi projetada com modularidade, segurança e clareza.  
Seguindo este guia, é possível expandir o sistema de forma organizada, mantendo compatibilidade com o front-end e o banco PostgreSQL.

---

© 2025 Projeto Novo Olhar — Desenvolvido com propósito social.
