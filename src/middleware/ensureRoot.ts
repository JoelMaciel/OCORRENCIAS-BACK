import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const ROLE_HIERARCHY = ["ROOT", "ADMIN", "USER"];

export const ensureRoot = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AppError("Não autorizado", 401);
  }

  const userRoles = req.user.roles || [];

  const hasAccess = userRoles.some(
    (role) => ROLE_HIERARCHY.indexOf(role) <= ROLE_HIERARCHY.indexOf("ROOT")
  );

  if (!hasAccess) {
    throw new AppError("Acesso negado. Requer perfil de ROOT.", 403);
  }

  return next();
};
