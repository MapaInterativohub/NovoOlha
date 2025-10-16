import { Router } from "express";
import {
  listLocais,
  getLocal,
  createLocal,
  updateLocal,
  deleteLocal,
} from "../controllers/local.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Locais
 *   description: Gerenciamento dos pontos de apoio (locais)
 */

/**
 * @swagger
 * /api/locais:
 *   get:
 *     summary: Lista todos os locais cadastrados
 *     tags: [Locais]
 *     responses:
 *       200:
 *         description: Lista de locais retornada com sucesso
 *       500:
 *         description: Erro ao listar locais
 */
router.get("/", listLocais);

/**
 * @swagger
 * /api/locais/{id}:
 *   get:
 *     summary: Busca um local específico
 *     tags: [Locais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do local
 *     responses:
 *       200:
 *         description: Local encontrado com sucesso
 *       404:
 *         description: Local não encontrado
 *       500:
 *         description: Erro ao buscar local
 */
router.get("/:id", getLocal);

/**
 * @swagger
 * /api/locais:
 *   post:
 *     summary: Cria um novo local
 *     tags: [Locais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do local
 *               descricao:
 *                 type: string
 *                 description: Descrição detalhada do local
 *               telefone:
 *                 type: string
 *                 description: Telefone de contato
 *               email:
 *                 type: string
 *                 description: E-mail de contato
 *               imagem:
 *                 type: string
 *                 description: URL da imagem do local
 *               numero:
 *                 type: string
 *                 description: Número do endereço
 *               complemento:
 *                 type: string
 *                 description: Complemento do endereço
 *               cep:
 *                 type: string
 *                 description: CEP do local
 *               rua:
 *                 type: string
 *                 description: Rua do local
 *               bairro:
 *                 type: string
 *                 description: Bairro do local
 *               cidade:
 *                 type: string
 *                 description: Cidade do local
 *               estado:
 *                 type: string
 *                 description: "Sigla do estado (ex: ES)"
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitude geográfica
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitude geográfica
 *               id_categoria:
 *                 type: integer
 *                 description: ID da categoria vinculada
 *               id_gestor:
 *                 type: integer
 *                 description: ID do gestor criador
 *     responses:
 *       201:
 *         description: Local criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar local
 */
router.post("/", createLocal);

/**
 * @swagger
 * /api/locais/{id}:
 *   put:
 *     summary: Atualiza as informações de um local existente
 *     tags: [Locais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do local a ser atualizado
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
 *               telefone:
 *                 type: string
 *               email:
 *                 type: string
 *               imagem:
 *                 type: string
 *               numero:
 *                 type: string
 *               complemento:
 *                 type: string
 *               cep:
 *                 type: string
 *               rua:
 *                 type: string
 *               bairro:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *                 description: "Sigla do estado (ex: ES)"
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               id_categoria:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Local atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Local não encontrado
 *       500:
 *         description: Erro ao atualizar local
 */
router.put("/:id", updateLocal);

/**
 * @swagger
 * /api/locais/{id}:
 *   delete:
 *     summary: Exclui um local específico
 *     tags: [Locais]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do local a ser excluído
 *     responses:
 *       200:
 *         description: Local excluído com sucesso
 *       404:
 *         description: Local não encontrado
 *       500:
 *         description: Erro ao excluir local
 */
router.delete("/:id", deleteLocal);

export default router;
