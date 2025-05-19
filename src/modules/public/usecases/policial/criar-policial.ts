import { inject, injectable } from "tsyringe";
import { IPolicialRepository } from "../../repositories/interfaces/IPolicialRepository";
import { IBatalhaoRepository } from "../../repositories/interfaces/IBatalhaoRepository";
import AppError from "../../../../errors/AppError";
import { PolicialResponseDTO } from "../../dtos/response/PolicialResponseDTO";
import { CreatePolicialInput } from "../../dtos/schemas/CreatePolicialSchema";
import { IRoleRepository } from "../../repositories/interfaces/IRoleRepository";
import { RoleType } from "../../enums/RoleType";
import { Role } from "../../entities/Role";
import { PasswordHasher } from "../../../../utils/security/PasswordHasher";
import BatalhaoNotFoundException from "../../../../exceptions/BatalhaoNotFoundException ";
import MatriculaAlreadyExistsException from "../../../../exceptions/MatriculaAlreadyExistsException";
import CPFAlreadyExistsException from "../../../../exceptions/CPFAlreadyExistsException";
import EmailAlreadyExistsException from "../../../../exceptions/EmailAlreadyExistsException";

@injectable()
export class CriarPolicialUseCase {
  constructor(
    @inject("PolicialRepository") private readonly policialRepository: IPolicialRepository,
    @inject("BatalhaoRepository") private readonly batalhaoRepository: IBatalhaoRepository,
    @inject("RoleRepository") private readonly roleRepository: IRoleRepository
  ) {}

  public async execute(batalhaoId: string, dto: CreatePolicialInput): Promise<PolicialResponseDTO> {
    await this.validateBatalhao(batalhaoId);
    await this.validateMatricula(dto.matricula);
    await this.validateCpf(dto.cpf);
    await this.validateEmail(dto.email);

    const hashedPassword = await PasswordHasher.hash(dto.password);

    const usuarioRole = await this.getUsuarioRole();

    const policial = await this.policialRepository.create(batalhaoId, {
      ...dto,
      password: hashedPassword,
      roles: [usuarioRole],
    });

    return new PolicialResponseDTO(policial);
  }

  private async getUsuarioRole(): Promise<Role> {
    const usuarioRole = await this.roleRepository.findByRoleName(RoleType.USUARIO);
    if (!usuarioRole) {
      throw new AppError("A role 'USUARIO' não foi encontrada no sistema", 404);
    }
    return usuarioRole;
  }

  private async validateBatalhao(batalhaoId: string): Promise<void> {
    const batalhao = await this.batalhaoRepository.findById(batalhaoId);

    if (!batalhao) {
      throw new BatalhaoNotFoundException();
    }
  }

  private async validateMatricula(matricula: string): Promise<void> {
    const existsByMatricula = await this.policialRepository.existsByMatricula(matricula);

    if (existsByMatricula) {
      throw new MatriculaAlreadyExistsException();
    }
  }

  private async validateCpf(cpf: string): Promise<void> {
    const existsByCpf = await this.policialRepository.existsByCpf(cpf);

    if (existsByCpf) {
      throw new CPFAlreadyExistsException();
    }
  }

  private async validateEmail(email: string): Promise<void> {
    const existsByEmail = await this.policialRepository.existsByEmail(email);

    if (existsByEmail) {
      throw new EmailAlreadyExistsException();
    }
  }
}
