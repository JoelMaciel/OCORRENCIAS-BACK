import { inject, injectable } from "tsyringe";
import { IEnderecoRepository } from "../../repositories/interfaces/IEnderecoRepository";
import VitimaNotFoundException from "../../../../exceptions/VitimaNotFoundException";
import { IVitimaRepository } from "../../repositories/interfaces/IVitimaRepository";

@injectable()
export class DeletarVitimaUseCase {
  constructor(
    @inject("VitimaRepository") private readonly vitimaRepository: IVitimaRepository,
    @inject("EnderecoRepository") private readonly enderecoRepository: IEnderecoRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const vitima = await this.vitimaRepository.findById(id);

    if (!vitima) {
      throw new VitimaNotFoundException();
    }
    await this.enderecoRepository.delete(vitima.endereco.id);

    await this.vitimaRepository.delete(vitima);
  }
}
