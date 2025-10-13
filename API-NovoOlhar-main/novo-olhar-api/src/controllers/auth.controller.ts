import { Request, Response } from 'express';
import prisma from '../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'troque_esta_chave';
export async function login(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) return res.status(400).json({ error: 'email e senha são necessários' });
    const gestor = await prisma.gestor.findUnique({ where: { email } });
    if (!gestor) return res.status(401).json({ error: 'Credenciais inválidas' });
    const match = await bcrypt.compare(senha, gestor.senha);
    if (!match) return res.status(401).json({ error: 'Credenciais inválidas' });
    const token = jwt.sign({ id: gestor.id_gestor, email: gestor.email }, JWT_SECRET, { expiresIn: '8h' });
    return res.json({ token, gestor: { id: gestor.id_gestor, nome: gestor.nome, email: gestor.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro no servidor' });
  }
}
