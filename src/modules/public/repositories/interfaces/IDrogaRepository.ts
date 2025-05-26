import { Droga } from "../../entities/Droga";

export interface IDrogaRepository {
  create(data: Partial<Droga>): Promise<Droga>;
  delete(droga: Droga): Promise<void>;
  findById(id: string): Promise<Droga | null>;
  update(id: string, data: Partial<Droga>): Promise<Droga>;
  findAll(page: number, size: number, tipo?: string): Promise<[Droga[], number]>;
}
