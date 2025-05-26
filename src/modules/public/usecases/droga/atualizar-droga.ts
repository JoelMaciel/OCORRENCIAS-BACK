import { inject, injectable } from "tsyringe";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";
import VitimaNotFoundException from "../../../../exceptions/VitimaNotFoundException";
import { VitimaResponseDTO } from "../../dtos/response/VitmaResponseDTO";
import { IDrogaRepository } from "../../repositories/interfaces/IDrogaRepository";
import { DrogaRequestDTO } from "../../dtos/schemas/CreateDrogaSchema";
import { DrogaResponseDTO } from "../../dtos/response/DrogaResponseDTO";
import DrogaNotFoundException from "../../../../exceptions/DrogaNotFoundException";
import { UnidadeMedida } from "../../enums/UnidadeMedida";

@injectable()
export class AtualizarDrogaUseCase {
  constructor(@inject("DrogaRepository") private readonly drogaRepository: IDrogaRepository) {}

  async execute(id: string, dto: DrogaRequestDTO): Promise<DrogaResponseDTO> {
    const droga = await this.drogaRepository.findById(id);

    if (!droga) {
      throw new DrogaNotFoundException();
    }

    const dataDroga = {
      ...dto,
      unidadeMedida: dto.unidadeMedida as UnidadeMedida,
    };

    const updatedDroga = await this.drogaRepository.update(id, dataDroga);

    return new DrogaResponseDTO(updatedDroga);
  }
}
