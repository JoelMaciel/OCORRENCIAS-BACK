import { DeepPartial } from "typeorm";
import { Policial } from "../../entities/Policial";

export interface IPolicialRepository {
  create(batalhaoId: string, data: Partial<Policial>): Promise<Policial>;
  findAll(page: number, limit: number, matricula?: string): Promise<[Policial[], number]>;
  findById(policialId: string): Promise<Policial | null>;
  updateBatalhao(id: string, data: DeepPartial<Policial>): Promise<Policial>;
  updatePostoGraduacao(id: string, data: DeepPartial<Policial>): Promise<Policial>;
  delete(id: string): Promise<void>;
  findByIds(ids: string[]): Promise<Policial[]>;
  existsByEmail(email: string, id?: string): Promise<boolean>;
  existsByMatricula(matricula: string): Promise<boolean>;
  existsByCpf(cpf: string): Promise<boolean>;
  findByEmailWithRoles(email: string): Promise<Policial | null>;
  save(policial: Policial): Promise<Policial>;
  updateRefreshToken(id: string, refreshToken: string, expiresIn: Date): Promise<void>;
  findByRefreshToken(refreshToken: string): Promise<Policial | null>;
  updateRefreshToken(
    id: string,
    refreshToken: string,
    expiresIn: Date,
    oldTokenId?: string
  ): Promise<void>;
  findByUserId(userId: string): Promise<Policial | null>;
}
