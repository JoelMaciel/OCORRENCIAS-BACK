import { AppDataSource } from "../../../../ormconfig";
import { Droga } from "../entities/Droga";
import { IDrogaRepository } from "./interfaces/IDrogaRepository";

export class DrogaRepository implements IDrogaRepository {
  constructor(private readonly drogaRepository = AppDataSource.getRepository(Droga)) {}

  public async create(data: Partial<Droga>): Promise<Droga> {
    const droga = this.drogaRepository.create(data);
    return await this.drogaRepository.save(droga);
  }

  public async findAll(page: number, size: number, tipo?: string): Promise<[Droga[], number]> {
    const queryBuilder = this.drogaRepository
      .createQueryBuilder("droga")
      .leftJoinAndSelect("droga.ocorrencia", "ocorrencia");

    if (tipo) {
      queryBuilder.where("LOWER(droga.tipo) ILIKE LOWER(:tipo)", { tipo: `%${tipo}%` });
    }

    const total = await queryBuilder.clone().distinct(true).getCount();

    const [result] = await queryBuilder
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    return [result, total];
  }

  public async findById(id: string): Promise<Droga | null> {
    return await this.drogaRepository.findOne({
      where: { id },
      relations: ["ocorrencia"],
      select: {
        id: true,
        tipo: true,
        quantidade: true,
        unidadeMedida: true,
        createdAt: true,
        updatedAt: true,
        ocorrencia: {
          id: true,
        },
      },
    });
  }
  public async update(id: string, data: Partial<Droga>): Promise<Droga> {
    const droga = await this.drogaRepository.findOneOrFail({
      where: { id },
      relations: ["ocorrencia"],
    });

    const drogaUpdated = this.drogaRepository.merge(droga, data);

    return this.drogaRepository.save(drogaUpdated);
  }

  public async delete(droga: Droga): Promise<void> {
    await this.drogaRepository.remove(droga);
  }
}
