import { Router } from "express";
import { listCarrossel, createCarrossel } from "../controllers/carrossel.controller";
import { ensureAuth } from "../middleware/auth";
import { deleteCarrossel } from "../controllers/carrossel.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Carrossel
 *   description: Rotas para gerenciamento dos slides exibidos na página inicial
 */

/**
 * @swagger
 * /api/carrossel:
 *   get:
 *     tags: [Carrossel]
 *     description: Retorna todos os slides ativos do carrossel, ordenados pela propriedade "ordem".
 *     responses:
 *       200:
 *         description: Lista de slides retornada com sucesso.
 *       500:
 *         description: Erro ao listar slides do carrossel.
 */
router.get("/", listCarrossel);

/**
 * @swagger
 * /api/carrossel:
 *   post:
 *     tags: [Carrossel]
 *     security:
 *       - bearerAuth: []
 *     description: Cria um novo slide no carrossel. É necessário estar autenticado com token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - imagem
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Rede de Apoio em Todo o Brasil
 *               descricao:
 *                 type: string
 *                 example: Conecte-se com instituições próximas e seguras.
 *               imagem:
 *                 type: string
 *                 example: https://placehold.co/800x400
 *               ordem:
 *                 type: integer
 *                 example: 1
 *               ativo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Slide criado com sucesso.
 *       400:
 *         description: Dados inválidos ou incompletos.
 *       401:
 *         description: Token JWT ausente ou inválido.
 *       500:
 *         description: Erro ao criar slide.
 */
router.post("/", ensureAuth, createCarrossel);

/**
 * @swagger
 * /api/carrossel/{id}:
 *   delete:
 *     tags: [Carrossel]
 *     description: Remove um slide do carrossel pelo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do slide a ser removido
 *     responses:
 *       200:
 *         description: Slide removido com sucesso.
 *       404:
 *         description: Slide não encontrado.
 *       500:
 *         description: Erro ao remover slide.
 */
router.delete("/:id", deleteCarrossel);


export default router;

/*import { Router } from 'express';
import { listCarrossel, createCarrossel } from '../controllers/carrossel.controller';
import { ensureAuth } from '../middleware/auth';
const router = Router();
router.get('/', listCarrossel);
router.post('/', ensureAuth, createCarrossel);
export default router;*/
