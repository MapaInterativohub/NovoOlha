import { Router } from "express";
import { createGestor, listGestores, alterarSenha, deleteGestor } from "../controllers/gestor.controller";
import { ensureAuth } from "../middleware/auth";


const router = Router();

/**
 * @swagger
 * tags:
 *   name: Gestores
 *   description: Rotas para criação e listagem de gestores do sistema
 */

/**
 * @swagger
 * /api/gestores:
 *   post:
 *     tags: [Gestores]
 *     description: Cria um novo gestor (administrador) do sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - cpf
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Ana Souza
 *               email:
 *                 type: string
 *                 example: ana@novoolhar.com
 *               telefone:
 *                 type: string
 *                 example: "11999998888"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "1990-05-14"
 *               cpf:
 *                 type: string
 *                 example: "98765432100"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       201:
 *         description: Gestor criado com sucesso.
 *       400:
 *         description: Campos obrigatórios faltando.
 *       500:
 *         description: Erro ao criar gestor.
 */
router.post("/", createGestor);

/**
 * @swagger
 * /api/gestores:
 *   get:
 *     tags: [Gestores]
 *     security:
 *       - bearerAuth: []
 *     description: Retorna a lista de todos os gestores cadastrados.
 *     responses:
 *       200:
 *         description: Lista de gestores retornada com sucesso.
 *       401:
 *         description: Token JWT ausente ou inválido.
 *       500:
 *         description: Erro ao buscar gestores.
 */
router.get("/", ensureAuth, listGestores);

/**
 * @swagger
 * /api/gestores/alterar-senha:
 *   put:
 *     tags: [Gestores]
 *     security:
 *       - bearerAuth: []
 *     description: Permite que o gestor autenticado altere sua senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senha_atual
 *               - nova_senha
 *             properties:
 *               senha_atual:
 *                 type: string
 *                 example: senhaTemporaria123
 *               nova_senha:
 *                 type: string
 *                 example: senhaNovaSegura456
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso.
 *       400:
 *         description: Senha atual incorreta.
 *       401:
 *         description: Token JWT ausente ou inválido.
 *       500:
 *         description: Erro interno ao alterar senha.
 */
router.put("/alterar-senha", ensureAuth, alterarSenha);

/**
 * @swagger
 * /api/gestores/{id}:
 *   delete:
 *     tags: [Gestores]
 *     summary: Exclui um gestor pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID do gestor
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Gestor excluído com sucesso
 *       400:
 *         description: Não é possível excluir gestor com dependências
 *       404:
 *         description: Gestor não encontrado
 */
router.delete("/:id", deleteGestor);



export default router;


/*import { Router } from 'express';
import { createGestor, listGestores } from '../controllers/gestor.controller';
import { ensureAuth } from '../middleware/auth';
const router = Router();
router.post('/', createGestor);
router.get('/', ensureAuth, listGestores);
export default router;*/
