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
}
