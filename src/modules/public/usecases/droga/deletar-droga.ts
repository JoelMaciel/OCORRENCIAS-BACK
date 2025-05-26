import { inject, injectable } from "tsyringe";
import { IDrogaRepository } from "../../repositories/interfaces/IDrogaRepository";
import DrogaNotFoundException from "../../../../exceptions/DrogaNotFoundException";

@injectable()
export class DeletarDrogaUseCase {
  constructor(@inject("DrogaRepository") private readonly drogaRepository: IDrogaRepository) {}

  public async execute(id: string): Promise<void> {
    const droga = await this.drogaRepository.findById(id);

    if (!droga) {
      throw new DrogaNotFoundException();
    }

    await this.drogaRepository.delete(droga);
  }
}
