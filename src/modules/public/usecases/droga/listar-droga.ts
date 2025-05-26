import { inject, injectable } from "tsyringe";
import { IDrogaRepository } from "../../repositories/interfaces/IDrogaRepository";
import { DrogaResponseDTO } from "../../dtos/response/DrogaResponseDTO";

@injectable()
export class ListarDrogaUseCase {
  constructor(@inject("DrogaRepository") private readonly drogaRepository: IDrogaRepository) {}

  public async execute(
    page: number,
    size: number,
    tipo?: string
  ): Promise<{ drogas: DrogaResponseDTO[]; total: number; page: number; totalPages: number }> {
    const [drogas, total] = await this.drogaRepository.findAll(page, size, tipo);

    const drogassDto = drogas.map((droga) => new DrogaResponseDTO(droga));

    const totalPages = Math.ceil(total / size);

    return {
      drogas: drogassDto,
      total,
      page,
      totalPages,
    };
  }
}
