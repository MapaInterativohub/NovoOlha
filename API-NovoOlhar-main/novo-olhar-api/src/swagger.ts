import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Novo Olhar",
      version: "1.0.0",
      description:
        "Documentação da API Novo Olhar. Permite gerenciar Gestores, Categorias, Locais e Carrossel.",
    },
    servers: [
      {
        url: "http://localhost:3001/api",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Caminho para os arquivos com anotações Swagger
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
