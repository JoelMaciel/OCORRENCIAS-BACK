import { inject, injectable } from "tsyringe";
import { IVitimaRepository } from "../../repositories/interfaces/IVitimaRepository";
import VitimaNotFoundException from "../../../../exceptions/VitimaNotFoundException";
import { VitimaResponseDTO } from "../../dtos/response/VitmaResponseDTO";

@injectable()
export class BuscaVitimaUseCase {
  constructor(@inject("VitimaRepository") private readonly vitimaRepository: IVitimaRepository) {}

  public async execute(id: string): Promise<VitimaResponseDTO> {
    const vitima = await this.vitimaRepository.findById(id);
    if (!vitima) {
      throw new VitimaNotFoundException();
    }
    return new VitimaResponseDTO(vitima);
  }
}
