import { ObjetoApreendido } from "../../entities/ObjetoApreendido";
import { Vitima } from "../../entities/Vitima";

export interface IObjetoApreendidoRepository {
  create(data: Partial<ObjetoApreendido>): Promise<ObjetoApreendido>;
  delete(objeto: ObjetoApreendido): Promise<void>;
  findById(id: string): Promise<ObjetoApreendido | null>;
  update(id: string, data: Partial<ObjetoApreendido>): Promise<ObjetoApreendido>;
  findAll(page: number, size: number, ocorrenciaId?: string): Promise<[ObjetoApreendido[], number]>;
}
