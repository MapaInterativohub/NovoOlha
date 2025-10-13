import { Router } from "express";
import { listCategorias, createCategoria } from "../controllers/categoria.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Rotas para listagem e criação de categorias de locais
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     tags: [Categorias]
 *     description: Retorna a lista de todas as categorias cadastradas.
 *     responses:
 *       200:
 *         description: Lista de categorias retornada com sucesso.
 *       500:
 *         description: Erro ao listar categorias.
 */
router.get("/", listCategorias);

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     tags: [Categorias]
 *     description: Cadastra uma nova categoria no sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Centro de Apoio Social
 *               descricao:
 *                 type: string
 *                 example: Atendimento psicológico e assistencial
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *       500:
 *         description: Erro ao criar categoria.
 */
router.post("/", createCategoria);

export default router;

/*import { Router } from 'express';
import { listCategorias, createCategoria } from '../controllers/categoria.controller';
const router = Router();
router.get('/', listCategorias);
router.post('/', createCategoria);
export default router;*/
