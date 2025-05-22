import { inject, injectable } from "tsyringe";
import { IVitimaRepository } from "../../repositories/interfaces/IVitimaRepository";
import CPFAlreadyExistsException from "../../../../exceptions/CPFAlreadyExistsException";

@injectable()
export class CpfValidator {
  constructor(@inject("VitimaRepository") private readonly vitimaRepository: IVitimaRepository) {}

  async validateCpf(cpf: string): Promise<void> {
    const existsByCpf = await this.vitimaRepository.existsByCpf(cpf);
    if (existsByCpf) {
      throw new CPFAlreadyExistsException();
    }
  }
}
