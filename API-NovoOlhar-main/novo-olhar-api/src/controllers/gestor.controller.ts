import { Request, Response } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';
export async function createGestor(req: Request, res: Response) {
  try {
    const { nome, email, telefone, data_nascimento, cpf, senha } = req.body;
    if (!nome || !email || !cpf || !senha) return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    const hashed = await bcrypt.hash(senha, 10);
    const gestor = await prisma.gestor.create({ data: { nome, email, telefone, data_nascimento: data_nascimento ? new Date(data_nascimento) : null, cpf, senha: hashed } });
    return res.status(201).json({ gestor: { id_gestor: gestor.id_gestor, nome: gestor.nome, email: gestor.email } });
  } catch (err:any) { console.error(err); return res.status(500).json({ error: err.message || 'Erro ao criar gestor' }); }
}
export async function listGestores(req: Request, res: Response) {
  try { const gestores = await prisma.gestor.findMany({ select: { id_gestor: true, nome: true, email: true, telefone: true, cpf: true } }); return res.json(gestores); } catch (err) { console.error(err); return res.status(500).json({ error: 'Erro ao listar gestores' }); }
}



export const alterarSenha = async (req: AuthRequest, res: Response) => {
  try {
    const { senha_atual, nova_senha } = req.body;
    const gestorId = req.gestorId;

    if (!senha_atual || !nova_senha) {
      return res.status(400).json({ error: "Informe a senha atual e a nova senha." });
    }

    const gestor = await prisma.gestor.findUnique({
      where: { id_gestor: gestorId },
    });

    if (!gestor) {
      return res.status(404).json({ error: "Gestor não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha_atual, gestor.senha);
    if (!senhaCorreta) {
      return res.status(400).json({ error: "Senha atual incorreta." });
    }

    const novaHash = await bcrypt.hash(nova_senha, 10);
    await prisma.gestor.update({
      where: { id_gestor: gestorId },
      data: {
        senha: novaHash,
        senha_temporaria: false,
      },
    });

    return res.status(200).json({ message: "Senha alterada com sucesso." });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    return res.status(500).json({ error: "Erro interno ao alterar senha." });
  }
};
