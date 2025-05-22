import { inject, injectable } from "tsyringe";
import { toEnderecoEntity } from "../../dtos/converter/EnderecoConverter";
import { IOcorrenciaRepository } from "../../repositories/interfaces/IOcorrenciaRepository";
import OcorrenciaNotFoundException from "../../../../exceptions/OcorrenciaNotFoundException";
import CPFAlreadyExistsException from "../../../../exceptions/CPFAlreadyExistsException";
import { IVitimaRepository } from "../../repositories/interfaces/IVitimaRepository";
import { VitimaRequestDTO } from "../../dtos/schemas/CreateVitimaSchema";
import { VitimaResponseDTO } from "../../dtos/response/VitmaResponseDTO";

@injectable()
export class CriarVitimaUseCase {
  constructor(
    @inject("VitimaRepository") private readonly vitimaRepository: IVitimaRepository,
    @inject("OcorrenciaRepository") private readonly oorrenciaRepository: IOcorrenciaRepository
  ) {}

  public async execute(id: string, dto: VitimaRequestDTO): Promise<VitimaResponseDTO> {
    const ocorrencia = await this.oorrenciaRepository.findById(id);

    if (!ocorrencia) {
      throw new OcorrenciaNotFoundException();
    }

    await this.validateCpf(dto.cpf);
    const endereco = toEnderecoEntity(dto.endereco);

    const acusado = await this.vitimaRepository.create({
      ...dto,
      endereco: endereco,
      ocorrencia: ocorrencia,
    });

    return new VitimaResponseDTO(acusado);
  }

  private async validateCpf(cpf: string): Promise<void> {
    const existsByCpf = await this.vitimaRepository.existsByCpf(cpf);
    if (existsByCpf) {
      throw new CPFAlreadyExistsException();
    }
  }
}
