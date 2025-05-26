import { inject, injectable } from "tsyringe";
import { IObjetoApreendidoRepository } from "../../repositories/interfaces/IObjetoApreendidoRepository";
import { ObjetoApreendidoResponseDTO } from "../../dtos/response/ObjetoApreendidoResponseDTO";

@injectable()
export class ListarObjetoUseCase {
  constructor(
    @inject("ObjetoApreendidoRepository")
    private readonly objetoRepository: IObjetoApreendidoRepository
  ) {}

  public async execute(
    page: number,
    size: number,
    ocorrenciaId?: string
  ): Promise<{
    objetos: ObjetoApreendidoResponseDTO[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const [objetos, total] = await this.objetoRepository.findAll(page, size, ocorrenciaId);

    const objetosDTO = objetos.map((objeto) => new ObjetoApreendidoResponseDTO(objeto));

    const totalPages = Math.ceil(total / size);

    return {
      objetos: objetosDTO,
      total,
      page,
      totalPages,
    };
  }
}
