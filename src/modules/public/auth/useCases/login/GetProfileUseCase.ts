import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../../repositories/interfaces/IPolicialRepository";
import PoliciaNotFoundException from "../../../../../exceptions/PoliciaNotFoundException";
import { ProfileResponseDTO } from "../../dtos/ProfileResponseDTO";

@injectable()
export class GetProfileUseCase {
  constructor(
    @inject("PolicialRepository")
    private policiaRepository: IPolicialRepository
  ) {}

  async execute(userId: string): Promise<ProfileResponseDTO> {
    const policial = await this.policiaRepository.findById(userId);

    if (!policial) {
      throw new PoliciaNotFoundException();
    }

    return new ProfileResponseDTO(
      policial.id,
      policial.nome,
      policial.matricula,
      policial.email,
      policial.postoGraduacao,
      policial.roles.map((r) => r.role),
      policial.batalhao?.nome,
      policial.dataAdmissao,
      policial.contato
    );
  }
}
