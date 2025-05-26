import { inject, injectable } from "tsyringe";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import OcorrenciaNotFoundException from "../../../../exceptions/OcorrenciaNotFoundException";
import { IDrogaRepository } from "../../repositories/interfaces/IDrogaRepository";
import { DrogaResponseDTO } from "../../dtos/response/DrogaResponseDTO";
import { DrogaRequestDTO } from "../../dtos/schemas/CreateDrogaSchema";
import { UnidadeMedida } from "../../enums/UnidadeMedida";

@injectable()
export class RegistrarDrogaUseCase {
  constructor(
    @inject("DrogaRepository") private readonly drogaRepository: IDrogaRepository,
    @inject("OcorrenciaRepository") private readonly ocrrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(id: string, dto: DrogaRequestDTO): Promise<DrogaResponseDTO> {
    const ocorrencia = await this.ocrrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new OcorrenciaNotFoundException();
    }

    const droga = await this.drogaRepository.create({
      ...dto,
      unidadeMedida: dto.unidadeMedida as UnidadeMedida,
      ocorrencia: ocorrencia,
    });

    return new DrogaResponseDTO(droga);
  }
}
