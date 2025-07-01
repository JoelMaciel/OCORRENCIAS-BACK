import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { LoginResponseDTO } from "../modules/public/auth/dtos/LoginResponseDTO";
import AppError from "../errors/AppError";

declare global {
  namespace Express {
    interface Request {
      user?: LoginResponseDTO["policial"];
    }
  }
}

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Não autorizado", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new AppError("JWT_SECRET não está configurado.", 500);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      sub: string;
      matricula: string;
      roles: string[];
    };

    req.user = {
      id: decoded.sub,
      nome: decoded.sub,
      matricula: decoded.matricula,
      roles: decoded.roles,
    };

    return next();
  } catch (error) {
    throw new AppError("Token inválido ou expirado", 401);
  }
};
