import { inject, injectable } from "tsyringe";
import { IVeiculoRepository } from "../../repositories/interfaces/IVeiculoRepository";
import VeiculoNotFoundException from "../../../../exceptions/VeiculoNotFoundException";

@injectable()
export class DeletarVeiculoUseCase {
  constructor(
    @inject("VeiculoRepository") private readonly veiculoRepository: IVeiculoRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const veiculo = await this.veiculoRepository.findById(id);

    if (!veiculo) {
      throw new VeiculoNotFoundException();
    }
    await this.veiculoRepository.delete(veiculo);
  }
}
