import { inject, injectable } from "tsyringe";
import { IObjetoApreendidoRepository } from "../../repositories/interfaces/IObjetoApreendidoRepository";
import { ObjetoApreendidoResponseDTO } from "../../dtos/response/ObjetoApreendidoResponseDTO";
import ObjetoApreendidoNotFoundException from "../../../../exceptions/ObjetoApreendidoNotFoundException ";

@injectable()
export class BuscaObjetoUseCase {
  constructor(
    @inject("ObjetoApreendidoRepository")
    private readonly objetoRepository: IObjetoApreendidoRepository
  ) {}

  public async execute(id: string): Promise<ObjetoApreendidoResponseDTO> {
    const objeto = await this.objetoRepository.findById(id);
    if (!objeto) {
      throw new ObjetoApreendidoNotFoundException();
    }
    return new ObjetoApreendidoResponseDTO(objeto);
  }
}
