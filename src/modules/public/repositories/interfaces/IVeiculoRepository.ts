import { VeiculoApreendido } from "../../entities/VeiculoApreendido";

export interface IVeiculoRepository {
  create(data: Partial<VeiculoApreendido>): Promise<VeiculoApreendido>;
  delete(veiculo: VeiculoApreendido): Promise<void>;
  findById(id: string): Promise<VeiculoApreendido | null>;
  update(id: string, data: Partial<VeiculoApreendido>): Promise<VeiculoApreendido>;
  findAll(
    page: number,
    size: number,
    placa?: string,
    ocorrenciaId?: string
  ): Promise<[VeiculoApreendido[], number]>;
}
