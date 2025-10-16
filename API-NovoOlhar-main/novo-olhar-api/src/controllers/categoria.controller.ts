import { Request, Response } from "express";
import prisma from "../prisma/client";

// 📋 Listar todas as categorias
export async function listCategorias(req: Request, res: Response) {
  try {
    const categorias = await prisma.categoria.findMany({
      orderBy: { id_categoria: "asc" },
    });
    return res.json(categorias);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao listar categorias" });
  }
}

// ➕ Criar uma nova categoria
export async function createCategoria(req: Request, res: Response) {
  try {
    const { nome, descricao, color } = req.body;
    if (!nome || !color) {
      return res.status(400).json({ error: "Os campos nome e color são obrigatórios." });
    }

    const categoria = await prisma.categoria.create({
      data: { nome, descricao, color },
    });

    return res.status(201).json(categoria);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar categoria" });
  }
}

// 🗑️ Remover uma categoria
export async function deleteCategoria(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const categoria = await prisma.categoria.findUnique({
      where: { id_categoria: id },
    });

    if (!categoria) {
      return res.status(404).json({ error: "Categoria não encontrada." });
    }

    await prisma.categoria.delete({
      where: { id_categoria: id },
    });

    return res.json({ message: "Categoria removida com sucesso!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao remover categoria." });
  }
}
