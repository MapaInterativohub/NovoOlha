import { Request, Response } from "express";
import prisma from "../prisma/client";

/**
 * Lista todos os slides do carrossel.
 */
export async function listCarrossel(req: Request, res: Response) {
  try {
    const slides = await prisma.carrossel.findMany({
      orderBy: { ordem: "asc" },
    });
    return res.json(slides);
  } catch (err) {
    console.error("Erro ao listar slides:", err);
    return res.status(500).json({ error: "Erro ao listar slides" });
  }
}

/**
 * Obtém um slide específico pelo ID.
 */
export async function getCarrossel(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const slide = await prisma.carrossel.findUnique({
      where: { id_carrossel: id },
    });

    if (!slide) {
      return res.status(404).json({ error: "Slide não encontrado" });
    }

    return res.json(slide);
  } catch (err) {
    console.error("Erro ao obter slide:", err);
    return res.status(500).json({ error: "Erro ao obter slide" });
  }
}

/**
 * Cria um novo slide no carrossel.
 */
export async function createCarrossel(req: Request, res: Response) {
  try {
    const { titulo, descricao, imagem, modulo, ativo = true } = req.body;

    if (!titulo || !imagem || !modulo) {
      return res.status(400).json({
        error: "Título, imagem e módulo são obrigatórios.",
      });
    }

    // Define link automático com base no módulo
    let link = "";
    switch (modulo) {
      case "empreendedorismo":
        link = "/empreendedorismo";
        break;
      case "mapa-interativo":
        link = "/mapa";
        break;
      case "plano-de-carreira":
        link = "/plano-de-carreira";
        break;
      default:
        link = "/";
        break;
    }

    const slide = await prisma.carrossel.create({
      data: {
        titulo,
        descricao,
        imagem,
        modulo,
        link,
        ativo,
        id_gestor: req.body.id_gestor || 1, // define gestor padrão (ou via token)
      },
    });

    return res.status(201).json(slide);
  } catch (err) {
    console.error("Erro ao criar slide:", err);
    return res.status(500).json({ error: "Erro ao criar slide" });
  }
}

/**
 * Atualiza um slide existente.
 */
export async function updateCarrossel(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { titulo, descricao, imagem, modulo, ativo } = req.body;

    const existente = await prisma.carrossel.findUnique({
      where: { id_carrossel: id },
    });
    if (!existente) {
      return res.status(404).json({ error: "Slide não encontrado" });
    }

    let link = existente.link;
    if (modulo) {
      switch (modulo) {
        case "empreendedorismo":
          link = "/empreendedorismo";
          break;
        case "mapa-interativo":
          link = "/mapa";
          break;
        case "plano-de-carreira":
          link = "/plano-de-carreira";
          break;
      }
    }

    const atualizado = await prisma.carrossel.update({
      where: { id_carrossel: id },
      data: { titulo, descricao, imagem, modulo, link, ativo },
    });

    return res.json(atualizado);
  } catch (err) {
    console.error("Erro ao atualizar slide:", err);
    return res.status(500).json({ error: "Erro ao atualizar slide" });
  }
}


// Remover um carrossel
export async function deleteCarrossel(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const carrossel = await prisma.carrossel.findUnique({
      where: { id_carrossel: id },
    });

    if (!carrossel) {
      return res.status(404).json({ error: "Carrossel não encontrado" });
    }

    await prisma.carrossel.delete({
      where: { id_carrossel: id },
    });

    return res.status(200).json({ message: "Carrossel removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover carrossel:", error);
    return res.status(500).json({ error: "Erro ao remover carrossel" });
  }
}

