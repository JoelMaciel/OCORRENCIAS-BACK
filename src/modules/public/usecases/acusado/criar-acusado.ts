import { inject, injectable } from "tsyringe";
import { IAcusadoRepository } from "../../repositories/interfaces/IAcusadoRepository";
import { AcusadoRequestDTO } from "../../dtos/schemas/CreateAcusadoSchema";
import { AcusadoResponseDTO } from "../../dtos/response/AcusadoResponseDTO";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import OcorrenciaNotFoundException from "../../../../exceptions/OcorrenciaNotFoundException";
import CPFAlreadyExistsException from "../../../../exceptions/CPFAlreadyExistsException";

@injectable()
export class CriarAcusadoUseCase {
  constructor(
    @inject("AcusadoRepository") private readonly acusadoRepository: IAcusadoRepository,
    @inject("OcorrenciaRepository") private readonly oorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(id: string, dto: AcusadoRequestDTO): Promise<AcusadoResponseDTO> {
    const ocorrencia = await this.oorrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new OcorrenciaNotFoundException();
    }

    await this.validateCpf(dto.cpf);

    const endereco = toEnderecoEntity(dto.endereco);

    const acusado = await this.acusadoRepository.create({
      ...dto,
      endereco: endereco,
      ocorrencia: ocorrencia,
    });

    return new AcusadoResponseDTO(acusado);
  }

  private async validateCpf(cpf: string): Promise<void> {
    const existsByCpf = await this.acusadoRepository.existsByCpf(cpf);
    if (existsByCpf) {
      throw new CPFAlreadyExistsException();
    }
  }
}
