import { inject, injectable } from "tsyringe";
import { IVeiculoRepository } from "../../repositories/interfaces/IVeiculoRepository";
import VeiculoNotFoundException from "../../../../exceptions/VeiculoNotFoundException";
import { VeiculoResponseDTO } from "../../dtos/response/VeiculoResponseDTO";

@injectable()
export class BuscarVeiculoUseCase {
  constructor(
    @inject("VeiculoRepository") private readonly veiculoRepository: IVeiculoRepository
  ) {}

  public async execute(id: string): Promise<VeiculoResponseDTO> {
    const veiculo = await this.veiculoRepository.findById(id);

    if (!veiculo) {
      throw new VeiculoNotFoundException();
    }
    return new VeiculoResponseDTO(veiculo);
  }
}
