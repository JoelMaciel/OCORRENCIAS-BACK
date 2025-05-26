import { inject, injectable } from "tsyringe";
import { IObjetoApreendidoRepository } from "../../repositories/interfaces/IObjetoApreendidoRepository";
import ObjetoApreendidoNotFoundException from "../../../../exceptions/ObjetoApreendidoNotFoundException ";

@injectable()
export class DeletarObjetoUseCase {
  constructor(
    @inject("ObjetoApreendidoRepository")
    private readonly objetoApreendidoRepository: IObjetoApreendidoRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const objeto = await this.objetoApreendidoRepository.findById(id);

    if (!objeto) {
      throw new ObjetoApreendidoNotFoundException();
    }

    await this.objetoApreendidoRepository.delete(objeto);
  }
}
