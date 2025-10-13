import { Router } from "express";
import { listLocais, getLocal, createLocal } from "../controllers/local.controller";
import { ensureAuth } from "../middleware/auth";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Locais
 *   description: Rotas para gerenciamento dos pontos de apoio (locais)
 */

/**
 * @swagger
 * /api/locais:
 *   get:
 *     tags: [Locais]
 *     description: Retorna todos os locais cadastrados no sistema, incluindo informações da categoria e gestor.
 *     responses:
 *       200:
 *         description: Lista de locais retornada com sucesso.
 *       500:
 *         description: Erro ao listar locais.
 */
router.get("/", listLocais);

/**
 * @swagger
 * /api/locais/{id}:
 *   get:
 *     tags: [Locais]
 *     description: Retorna um local específico pelo seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID do local desejado.
 *     responses:
 *       200:
 *         description: Dados do local retornados com sucesso.
 *       404:
 *         description: Local não encontrado.
 *       500:
 *         description: Erro ao buscar o local.
 */
router.get("/:id", getLocal);

/**
 * @swagger
 * /api/locais:
 *   post:
 *     tags: [Locais]
 *     security:
 *       - bearerAuth: []
 *     description: Cria um novo local de apoio. É necessário estar autenticado com um token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - id_categoria
 *               - id_gestor
 *               - cidade
 *               - estado
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Centro de Acolhimento Luz do Amanhã
 *               descricao:
 *                 type: string
 *                 example: Oferece suporte psicológico e jurídico gratuito.
 *               telefone:
 *                 type: string
 *                 example: "1130225566"
 *               email:
 *                 type: string
 *                 example: contato@luzdoamanha.org
 *               imagem:
 *                 type: string
 *                 example: "https://placehold.co/400x200"
 *               latitude:
 *                 type: number
 *                 example: -23.5489
 *               longitude:
 *                 type: number
 *                 example: -46.6388
 *               numero:
 *                 type: string
 *                 example: "150"
 *               complemento:
 *                 type: string
 *                 example: "Sala 3"
 *               cidade:
 *                 type: string
 *                 example: "São Paulo"
 *               estado:
 *                 type: string
 *                 example: "SP"
 *               bairro:
 *                 type: string
 *                 example: "Centro"
 *               rua:
 *                 type: string
 *                 example: "Av. Liberdade"
 *               cep:
 *                 type: string
 *                 example: "01002-000"
 *               id_categoria:
 *                 type: integer
 *                 example: 1
 *               id_gestor:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Local criado com sucesso.
 *       400:
 *         description: Dados inválidos ou incompletos.
 *       401:
 *         description: Token JWT ausente ou inválido.
 *       500:
 *         description: Erro ao criar local.
 */
router.post("/", ensureAuth, createLocal);

export default router;

/*import { Router } from 'express';
import { listLocais, getLocal, createLocal } from '../controllers/local.controller';
import { ensureAuth } from '../middleware/auth';
const router = Router();
router.get('/', listLocais);
router.get('/:id', getLocal);
router.post('/', ensureAuth, createLocal);
export default router;*/
