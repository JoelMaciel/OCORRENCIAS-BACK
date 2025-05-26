import { inject, injectable } from "tsyringe";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import OcorrenciaNotFoundException from "../../../../exceptions/OcorrenciaNotFoundException";
import { IObjetoApreendidoRepository } from "../../repositories/interfaces/IObjetoApreendidoRepository";
import { ObjetoApreendidoRequestDTO } from "../../dtos/schemas/CreateObjetoApreendidoSchema";
import { ObjetoApreendidoResponseDTO } from "../../dtos/response/ObjetoApreendidoResponseDTO";

@injectable()
export class RegistrarObjetoApreendidoUseCase {
  constructor(
    @inject("ObjetoApreendidoRepository")
    private readonly objetoApreendidoRepository: IObjetoApreendidoRepository,
    @inject("OcorrenciaRepository") private readonly oorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(
    id: string,
    dto: ObjetoApreendidoRequestDTO
  ): Promise<ObjetoApreendidoResponseDTO> {
    const ocorrencia = await this.oorrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new OcorrenciaNotFoundException();
    }

    const objeto = await this.objetoApreendidoRepository.create({
      ...dto,
      ocorrencia: ocorrencia,
    });

    return new ObjetoApreendidoResponseDTO(objeto);
  }
}
