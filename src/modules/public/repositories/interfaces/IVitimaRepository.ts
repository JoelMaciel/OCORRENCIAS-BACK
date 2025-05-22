import { Vitima } from "../../entities/Vitima";

export interface IVitimaRepository {
  create(data: Partial<Vitima>): Promise<Vitima>;
  delete(viitma: Vitima): Promise<void>;
  findById(id: string): Promise<Vitima | null>;
  update(id: string, data: Partial<Vitima>): Promise<Vitima>;
  existsByCpf(cpf: string): Promise<boolean>;
  findAll(page: number, size: number, nome?: string, cpf?: string): Promise<[Vitima[], number]>;
}
