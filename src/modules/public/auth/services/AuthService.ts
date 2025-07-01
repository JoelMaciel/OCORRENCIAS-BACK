import jwt, { JwtPayload } from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Policial } from "../../entities/Policial";
import AppError from "../../../../errors/AppError";

export class AuthService {
  static generateAccessToken(policial: Policial): string {
    if (!process.env.JWT_SECRET) {
      throw new AppError("JWT_SECRET não está configurado.", 400);
    }

    const roles = policial.roles.map((role) => role.role);

    return jwt.sign(
      {
        sub: policial.id,
        matricula: policial.matricula,
        roles,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );
  }

  static generateRefreshToken(policial: Policial): string {
    return jwt.sign({ sub: policial.id }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
  }

  static verifyAccessToken(token: string): jwt.JwtPayload {
    if (!process.env.JWT_SECRET) {
      throw new AppError("JWT_SECRET não está configurado.", 400);
    }

    return jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;
  }

  static verifyRefreshToken(refreshToken: string, secret?: string): jwt.JwtPayload | null {
    try {
      if (!secret && !process.env.JWT_REFRESH_SECRET) {
        throw new AppError("JWT_REFRESH_SECRET não está configurado.", 400);
      }

      return jwt.verify(refreshToken, secret || process.env.JWT_REFRESH_SECRET!) as jwt.JwtPayload;
    } catch (error) {
      return null;
    }
  }

  static comparePassword(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
