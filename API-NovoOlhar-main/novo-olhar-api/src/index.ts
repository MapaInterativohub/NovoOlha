import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerSpec from "./swagger";

dotenv.config();
import authRoutes from "./routes/auth.routes";
import gestorRoutes from "./routes/gestor.routes";
import categoriaRoutes from "./routes/categoria.routes";
import carrosselRoutes from "./routes/carrossel.routes";
import localRoutes from "./routes/local.routes";


const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares globais
app.use(express.json());
app.use(cors());

// Rotas principais
app.use("/api/auth", authRoutes);
app.use("/api/gestores", gestorRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/carrossel", carrosselRoutes);
app.use("/api/locais", localRoutes); // ✅ Registro da rota de locais

// Documentação Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Novo Olhar API',
      version: '1.0.0',
      description: 'API para o projeto Novo Olhar - documentação Swagger em Português'
    },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => res.json({ ok: true, project: 'Novo Olhar API' }));

app.use('/api/categorias', categoriaRoutes);
app.use('/api/gestores', gestorRoutes);
app.use('/api/locais', localRoutes);
app.use('/api/carrossel', carrosselRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Docs: http://localhost:${PORT}/docs`);
});
