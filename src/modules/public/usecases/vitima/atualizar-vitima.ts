import { inject, injectable } from "tsyringe";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";
import { IVitimaRepository } from "../../repositories/interfaces/IVitimaRepository";
import { UpdateVitimaRequestDTO } from "../../dtos/schemas/UpdateVitimaSchema";
import VitimaNotFoundException from "../../../../exceptions/VitimaNotFoundException";
import { VitimaResponseDTO } from "../../dtos/response/VitmaResponseDTO";

@injectable()
export class AtualizarVitimaUseCase {
  constructor(@inject("VitimaRepository") private readonly vitimaRepository: IVitimaRepository) {}

  async execute(id: string, dto: UpdateVitimaRequestDTO): Promise<VitimaResponseDTO> {
    const acusado = await this.vitimaRepository.findById(id);

    if (!acusado) {
      throw new VitimaNotFoundException();
    }

    const endereco = toEnderecoEntity(dto.endereco);

    const data = {
      ...dto,
      endereco: endereco,
    };

    const updatedAcusado = await this.vitimaRepository.update(id, data);

    return new VitimaResponseDTO(updatedAcusado);
  }
}
