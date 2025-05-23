import { inject, injectable } from "tsyringe";
import { IVeiculoRepository } from "../../repositories/interfaces/IVeiculoRepository";
import { VeiculoRequestDTO } from "../../dtos/schemas/CreateVeiculoSchema";
import { VeiculoResponseDTO } from "../../dtos/response/VeiculoResponseDTO";
import VeiculoNotFoundException from "../../../../exceptions/VeiculoNotFoundException";

@injectable()
export class AtualizarVeiculoUseCase {
  constructor(
    @inject("VeiculoRepository") private readonly veiculoRepository: IVeiculoRepository
  ) {}

  public async execute(id: string, dto: VeiculoRequestDTO): Promise<VeiculoResponseDTO> {
    const veiculo = await this.veiculoRepository.findById(id);

    if (!veiculo) {
      throw new VeiculoNotFoundException();
    }

    const updatedVeiculo = await this.veiculoRepository.update(id, dto);

    return new VeiculoResponseDTO(updatedVeiculo);
  }
}
