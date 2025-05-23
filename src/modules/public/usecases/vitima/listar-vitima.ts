import { inject, injectable } from "tsyringe";
import { IVitimaRepository } from "../../repositories/interfaces/IVitimaRepository";
import { VitimaResponseDTO } from "../../dtos/response/VitmaResponseDTO";

@injectable()
export class ListarVitimaUseCase {
  constructor(@inject("VitimaRepository") private readonly vitimaRepository: IVitimaRepository) {}

  public async execute(
    page: number,
    size: number,
    nome?: string,
    cpf?: string
  ): Promise<{ vitimas: VitimaResponseDTO[]; total: number; page: number; totalPages: number }> {
    const [vitimas, total] = await this.vitimaRepository.findAll(page, size, nome, cpf);

    const totalPages = Math.ceil(total / size);

    const vitimasDto = vitimas.map((vitima) => new VitimaResponseDTO(vitima));

    return {
      vitimas: vitimasDto,
      total,
      page,
      totalPages,
    };
  }
}
