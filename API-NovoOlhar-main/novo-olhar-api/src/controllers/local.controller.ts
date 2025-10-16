import { Request, Response } from "express";
import prisma from "../prisma/client";

// 🔹 Listar todos os locais
export async function listLocais(req: Request, res: Response) {
  try {
    const locais = await prisma.local.findMany({
      include: {
        categoria: true,
        gestor: {
          select: { id_gestor: true, nome: true, email: true },
        },
      },
    });
    return res.json(locais);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao listar locais" });
  }
}

// 🔹 Obter local por ID
export async function getLocal(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const local = await prisma.local.findUnique({
      where: { id_local: id },
      include: { categoria: true, gestor: true },
    });

    if (!local)
      return res.status(404).json({ error: "Local não encontrado" });

    return res.json(local);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao obter local" });
  }
}

// Criar local
export const createLocal = async (req: Request, res: Response) => {
  try {
    const {
      nome,
      descricao,
      breve,
      telefone,
      email,
      imagem,
      numero,
      complemento,
      cep,
      rua,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      id_categoria,
      id_gestor
    } = req.body;

    const novoLocal = await prisma.local.create({
      data: {
        nome,
        descricao,
        breve,
        telefone,
        email,
        imagem,
        numero,
        complemento,
        cep,
        rua,
        bairro,
        cidade,
        estado,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        id_categoria: Number(id_categoria),
        id_gestor: Number(id_gestor)
      },
    });

    res.status(201).json(novoLocal);
  } catch (error) {
    console.error("Erro ao criar local:", error);
    res.status(500).json({ error: "Erro ao criar local" });
  }
};

// Atualizar local
export const updateLocal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      nome,
      descricao,
      breve,
      telefone,
      email,
      imagem,
      numero,
      complemento,
      cep,
      rua,
      bairro,
      cidade,
      estado,
      latitude,
      longitude,
      id_categoria,
      id_gestor
    } = req.body;

    const localAtualizado = await prisma.local.update({
      where: { id_local: Number(id) },
      data: {
        nome,
        descricao,
        breve,
        telefone,
        email,
        imagem,
        numero,
        complemento,
        cep,
        rua,
        bairro,
        cidade,
        estado,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        id_categoria: Number(id_categoria),
        id_gestor: Number(id_gestor)
      },
    });

    res.json(localAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar local:", error);
    res.status(500).json({ error: "Erro ao atualizar local" });
  }
};

// 🔹 Excluir local
export async function deleteLocal(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    await prisma.local.delete({ where: { id_local: id } });
    return res.json({ message: "Local removido com sucesso" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao remover local" });
  }
}
