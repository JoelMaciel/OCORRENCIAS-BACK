import { AppDataSource } from "../../../../ormconfig";
import { ObjetoApreendido } from "../entities/ObjetoApreendido";
import { IObjetoApreendidoRepository } from "./interfaces/IObjetoApreendidoRepository";

export class ObjetoApreendidoRepository implements IObjetoApreendidoRepository {
  constructor(private readonly objetoApreendido = AppDataSource.getRepository(ObjetoApreendido)) {}

  public async create(data: Partial<ObjetoApreendido>): Promise<ObjetoApreendido> {
    const objeto = this.objetoApreendido.create(data);
    return await this.objetoApreendido.save(objeto);
  }

  public async findAll(
    page: number,
    size: number,
    ocorrenciaId?: string
  ): Promise<[ObjetoApreendido[], number]> {
    const queryBuilder = this.objetoApreendido
      .createQueryBuilder("objetosApreendidos")
      .leftJoinAndSelect("objetosApreendidos.ocorrencia", "ocorrencia");

    if (ocorrenciaId) {
      queryBuilder.where("objetosApreendidos.ocorrencia_id = :ocorrenciaId", {
        ocorrenciaId,
      });
    }

    queryBuilder.skip((page - 1) * size).take(size);

    return await queryBuilder.getManyAndCount();
  }

  public async findById(id: string): Promise<ObjetoApreendido | null> {
    return await this.objetoApreendido.findOne({
      where: { id },
      relations: ["ocorrencia"],
    });
  }

  public async update(id: string, data: Partial<ObjetoApreendido>): Promise<ObjetoApreendido> {
    const objeto = await this.objetoApreendido.findOneOrFail({
      where: { id },
      relations: ["ocorrencia"],
    });

    const updatedObjeto = this.objetoApreendido.merge(objeto, data);

    return this.objetoApreendido.save(updatedObjeto);
  }

  public async delete(objeto: ObjetoApreendido): Promise<void> {
    await this.objetoApreendido.remove(objeto);
  }
}
