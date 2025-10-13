import { Request, Response } from "express";
import prisma from "../prisma/client";
export async function listCarrossel(req: Request, res: Response) {
  try {
    const slides = await prisma.carrossel.findMany({
      where: { ativo: true },
      orderBy: { ordem: "asc" },
    });
    return res.json(slides);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao listar carrossel" });
  }
}
export async function createCarrossel(req: Request, res: Response) {
  try {
    const { titulo, descricao, imagem, ordem, ativo } = req.body;
    const id_gestor = (req as any).gestorId;
    const slide = await prisma.carrossel.create({
      data: {
        titulo,
        descricao,
        imagem,
        ordem: ordem || 0,
        ativo: ativo ?? true,
        id_gestor,
      },
    });
    return res.status(201).json(slide);
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ error: err.message || "Erro ao criar slide" });
  }
}
