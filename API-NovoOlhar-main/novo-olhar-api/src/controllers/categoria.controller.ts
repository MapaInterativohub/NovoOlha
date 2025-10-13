import { Request, Response } from 'express';
import prisma from '../prisma/client';
export async function listCategorias(req: Request, res: Response) { try { const categorias = await prisma.categoria.findMany(); return res.json(categorias); } catch (err) { console.error(err); return res.status(500).json({ error: 'Erro ao listar categorias' }); } }
export async function createCategoria(req: Request, res: Response) { try { const { nome, descricao } = req.body; const cat = await prisma.categoria.create({ data: { nome, descricao } }); return res.status(201).json(cat); } catch (err) { console.error(err); return res.status(500).json({ error: 'Erro ao criar categoria' }); } }
