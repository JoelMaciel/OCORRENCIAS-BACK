import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { roleHierarchy, hasRequiredRole } from "../utils/roleUtils";

export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) throw new AppError("Não autorizado", 401);

  if (!hasRequiredRole(req.user.roles || [], "ADMIN", roleHierarchy)) {
    throw new AppError("Acesso negado. Requer perfil de ADMIN ou superior.", 403);
  }

  return next();
};
