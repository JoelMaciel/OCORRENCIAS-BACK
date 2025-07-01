import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationSchema } from "../../dtos/validation/ValidateSchema";
import { LoginRequestDTO, LoginSchema } from "../dtos/LoginSchema";
import { LoginUseCase } from "../useCases/login/LoginUseCase";
import { RefreshTokenSchema } from "../../dtos/schemas/RefreshTokenSchema";
import { RefreshTokenUseCase } from "../useCases/refreshToken/RefreshTokenUseCase";
import { GetProfileUseCase } from "../useCases/login/GetProfileUseCase";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const dto = await ValidationSchema.validate<LoginRequestDTO>(LoginSchema, req.body);

      const loginUseCase = container.resolve(LoginUseCase);
      const result = await loginUseCase.execute(dto);
      res.json(result).status(201);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = await ValidationSchema.validate<{ refreshToken: string }>(
        RefreshTokenSchema,
        req.body
      );

      const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
      const result = await refreshTokenUseCase.execute(refreshToken);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
  async profile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: "Não autorizado" });
        return;
      }

      const { id } = req.user;

      const getProfileUseCase = container.resolve(GetProfileUseCase);
      const profileData = await getProfileUseCase.execute(id);

      res.status(200).json(profileData);
    } catch (error) {
      next(error);
    }
  }
}
