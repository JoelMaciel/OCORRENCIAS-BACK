import { inject, injectable } from "tsyringe";
import { IVeiculoRepository } from "../../repositories/interfaces/IVeiculoRepository";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import { VeiculoRequestDTO } from "../../dtos/schemas/CreateVeiculoSchema";
import { VeiculoResponseDTO } from "../../dtos/response/VeiculoResponseDTO";
import OcorrenciaNotFoundException from "../../../../exceptions/OcorrenciaNotFoundException";
import { VeiculoApreendido } from "../../entities/VeiculoApreendido";

@injectable()
export class CadastrarVeiculoUseCase {
  constructor(
    @inject("VeiculoRepository") private readonly veiculoRepository: IVeiculoRepository,
    @inject("OcorrenciaRepository") private readonly ocorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(ocorrenciaId: string, dto: VeiculoRequestDTO): Promise<VeiculoResponseDTO> {
    const ocorrencia = await this.ocorrenciaRepository.findById(ocorrenciaId);

    if (!ocorrencia) {
      throw new OcorrenciaNotFoundException();
    }

    const veiculoData: Partial<VeiculoApreendido> = {
      ...dto,
      ocorrencia: ocorrencia,
    };

    const veiculo = await this.veiculoRepository.create(veiculoData);
    return new VeiculoResponseDTO(veiculo);
  }

  private async validateOcorrencia(id: string) {}
}
