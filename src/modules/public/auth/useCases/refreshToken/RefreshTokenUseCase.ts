import jwt, { JwtPayload } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AuthService } from "../../services/AuthService";
import { IPolicialRepository } from "../../../repositories/interfaces/IPolicialRepository";
import AppError from "../../../../../errors/AppError";
import { compareRefreshToken, hashRefreshToken } from "../../../../../utils/security/hash";

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("PolicialRepository")
    private policiaRepository: IPolicialRepository
  ) {}

  async execute(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    let payload: JwtPayload;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload;
    } catch (error) {
      throw new AppError("Refresh token inválido", 401);
    }

    if (!payload.sub) {
      throw new AppError("Token malformado: sub não encontrado", 401);
    }

    const policial = await this.policiaRepository.findByUserId(payload.sub);

    if (!policial || !policial.refreshToken || !policial.refreshTokenExpiresIn) {
      throw new AppError("Token não associado a um usuário", 401);
    }

    const isTokenValid = await compareRefreshToken(refreshToken, policial.refreshToken);
    if (!isTokenValid) {
      throw new AppError("Token inválido", 401);
    }

    if (policial.refreshTokenExpiresIn < new Date()) {
      throw new AppError("Token expirado", 401);
    }

    const newRefreshToken = AuthService.generateRefreshToken(policial);
    const accessToken = AuthService.generateAccessToken(policial);

    await this.policiaRepository.updateRefreshToken(
      policial.id,
      await hashRefreshToken(newRefreshToken),
      addDaysToDate(new Date(), 7)
    );

    return { accessToken, refreshToken: newRefreshToken };
  }
}

function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
