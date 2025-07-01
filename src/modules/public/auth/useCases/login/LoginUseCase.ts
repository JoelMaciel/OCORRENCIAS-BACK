import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../../repositories/interfaces/IPolicialRepository";
import { LoginResponseDTO } from "../../dtos/LoginResponseDTO";
import { AuthService } from "../../services/AuthService";
import { Policial } from "../../../entities/Policial";
import AppError from "../../../../../errors/AppError";
import { LoginRequestDTO } from "../../dtos/LoginSchema";
import { hashRefreshToken } from "../../../../../utils/security/hash";

@injectable()
export class LoginUseCase {
  constructor(
    @inject("PolicialRepository")
    private policiaRepository: IPolicialRepository
  ) {}

  async execute(dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    const { email, password } = dto;

    const policial = await this.policiaRepository.findByEmailWithRoles(email);

    if (!policial) {
      throw new AppError("Credenciais inválidas", 401);
    }

    this.validatePassword(password, policial);

    const accessToken = AuthService.generateAccessToken(policial);
    const refreshToken = AuthService.generateRefreshToken(policial);

    const hashedRefreshToken = await hashRefreshToken(refreshToken);

    await this.policiaRepository.updateRefreshToken(
      policial.id,
      hashedRefreshToken,
      addDaysToDate(new Date(), 7)
    );

    policial.refreshToken = hashedRefreshToken;
    policial.refreshTokenExpiresIn = addDaysToDate(new Date(), 7);

    return new LoginResponseDTO(policial, accessToken, refreshToken);
  }

  private validatePassword(password: string, policial: Policial) {
    if (!AuthService.comparePassword(password, policial.password)) {
      throw new AppError("Credenciais inválidas", 401);
    }
  }
}

function addDaysToDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
