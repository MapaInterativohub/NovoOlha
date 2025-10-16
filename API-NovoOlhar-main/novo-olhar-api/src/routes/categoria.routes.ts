import { Router } from "express";
import {
  listCategorias,
  createCategoria,
  deleteCategoria,
} from "../controllers/categoria.controller";
import { ensureAuth } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorias
 *   description: Gerenciamento de categorias de locais
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
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
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               color:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       500:
 *         description: Erro ao criar categoria.
 */
router.post("/", ensureAuth, createCategoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Remove uma categoria existente
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da categoria a ser removida
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria removida com sucesso.
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro ao remover categoria.
 */
router.delete("/:id", ensureAuth, deleteCategoria);

export default router;
