import { inject, injectable } from "tsyringe";
import { IDrogaRepository } from "../../repositories/interfaces/IDrogaRepository";
import DrogaNotFoundException from "../../../../exceptions/DrogaNotFoundException";
import { DrogaResponseDTO } from "../../dtos/response/DrogaResponseDTO";

@injectable()
export class BuscarDrogaUseCase {
  constructor(@inject("DrogaRepository") private readonly drogaRepository: IDrogaRepository) {}

  public async execute(id: string): Promise<DrogaResponseDTO> {
    const droga = await this.drogaRepository.findById(id);
    if (!droga) {
      throw new DrogaNotFoundException();
    }
    return new DrogaResponseDTO(droga);
  }
}
