import { inject, injectable } from "tsyringe";
import { IVeiculoRepository } from "../../repositories/interfaces/IVeiculoRepository";
import { VeiculoResponseDTO } from "../../dtos/response/VeiculoResponseDTO";

@injectable()
export class ListarVeiculoUseCase {
  constructor(
    @inject("VeiculoRepository") private readonly veiculoRepository: IVeiculoRepository
  ) {}

  public async execute(
    page: number,
    size: number,
    placa?: string
  ): Promise<{
    veiculos: VeiculoResponseDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [veiculos, total] = await this.veiculoRepository.findAll(page, size, placa);

    const totalPages = Math.ceil(total / size);

    const veiculosDTO = veiculos.map((veiculo) => new VeiculoResponseDTO(veiculo));

    return { veiculos: veiculosDTO, total, page, totalPages };
  }
}
