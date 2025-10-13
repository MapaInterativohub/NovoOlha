import { Router } from "express";
import { login } from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Rotas relacionadas ao login e autenticação de gestores
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Autenticação]
 *     description: Realiza o login de um gestor e retorna o token JWT para autenticação.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@novoolhar.com
 *               senha:
 *                 type: string
 *                 example: senhaSegura123
 *     responses:
 *       200:
 *         description: Retorna token JWT e dados básicos do gestor autenticado.
 *       400:
 *         description: Dados ausentes ou incorretos.
 *       401:
 *         description: Credenciais inválidas.
 *       500:
 *         description: Erro interno do servidor.
 */
router.post("/login", login);

export default router;


/*import { Router } from 'express';
import { login } from '../controllers/auth.controller';
const router = Router();
router.post('/login', login);
export default router;*/
