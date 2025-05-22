import { AppDataSource } from "../../../../ormconfig";
import { Vitima } from "../entities/Vitima";
import { IVitimaRepository } from "./interfaces/IVitimaRepository";

export class VitimaRepository implements IVitimaRepository {
  constructor(private readonly vitimaRepository = AppDataSource.getRepository(Vitima)) {}

  public async create(data: Partial<Vitima>): Promise<Vitima> {
    const newVitima = this.vitimaRepository.create(data);
    return await this.vitimaRepository.save(newVitima);
  }

  public async findAll(
    page: number,
    size: number,
    nome?: string,
    cpf?: string
  ): Promise<[Vitima[], number]> {
    const queryBuilder = this.vitimaRepository
      .createQueryBuilder("vitima")
      .leftJoinAndSelect("vitima.endereco", "endereco");

    if (nome) {
      queryBuilder.where("LOWER(vitima.nome) ILIKE LOWER(:nome)", { nome: `%${nome}%` });
    }

    if (cpf) {
      queryBuilder.andWhere("LOWER(vitima.cpf) ILIKE LOWER(:cpf)", { cpf: `%${cpf}%` });
    }

    const [result, total] = await queryBuilder
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    return [result, total];
  }

  public async findById(id: string): Promise<Vitima | null> {
    return await this.vitimaRepository.findOne({
      where: { id },
      relations: ["endereco"],
    });
  }

  public async update(id: string, data: Partial<Vitima>): Promise<Vitima> {
    const vitima = await this.vitimaRepository.findOneOrFail({
      where: { id },
    });

    const updatedVitima = this.vitimaRepository.merge(vitima, data);

    return this.vitimaRepository.save(updatedVitima);
  }

  public async delete(vitima: Vitima): Promise<void> {
    await this.vitimaRepository.remove(vitima);
  }

  public async existsByCpf(cpf: string): Promise<boolean> {
    const cpfExistente = await this.vitimaRepository.findOne({
      where: { cpf },
    });
    return !!cpfExistente;
  }
}
