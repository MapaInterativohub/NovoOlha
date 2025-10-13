import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "troque_esta_chave";

export interface AuthRequest extends Request {
  gestorId?: number;
}

/**
 * Middleware de autenticação JWT
 * Valida o token e injeta o ID do gestor autenticado em req.gestorId
 */
export function ensureAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ error: "Token não fornecido" });

  const parts = auth.split(" ");
  if (parts.length !== 2)
    return res.status(401).json({ error: "Erro no formato do token" });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ error: "Token mal formatado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    // Aqui está o ajuste importante:
    req.gestorId = decoded.id_gestor;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
