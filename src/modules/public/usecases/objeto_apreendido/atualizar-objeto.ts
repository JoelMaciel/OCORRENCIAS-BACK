import { inject, injectable } from "tsyringe";
import { IObjetoApreendidoRepository } from "../../repositories/interfaces/IObjetoApreendidoRepository";
import { ObjetoApreendidoRequestDTO } from "../../dtos/schemas/CreateObjetoApreendidoSchema";
import { ObjetoApreendidoResponseDTO } from "../../dtos/response/ObjetoApreendidoResponseDTO";
import ObjetoApreendidoNotFoundException from "../../../../exceptions/ObjetoApreendidoNotFoundException ";

@injectable()
export class AtualizarObjetoApreendidoUseCase {
  constructor(
    @inject("ObjetoApreendidoRepository")
    private readonly objetoApreendidoRepository: IObjetoApreendidoRepository
  ) {}

  async execute(id: string, dto: ObjetoApreendidoRequestDTO): Promise<ObjetoApreendidoResponseDTO> {
    const objeto = await this.objetoApreendidoRepository.findById(id);

    if (!objeto) {
      throw new ObjetoApreendidoNotFoundException();
    }

    const updatedObjeto = await this.objetoApreendidoRepository.update(id, dto);

    return new ObjetoApreendidoResponseDTO(updatedObjeto);
  }
}
