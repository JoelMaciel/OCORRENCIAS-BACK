import { DeepPartial, In, Not } from "typeorm";
import { AppDataSource } from "../../../../ormconfig";
import { Policial } from "../entities/Policial";

import { IPolicialRepository } from "./interfaces/IPolicialRepository";

export class PolicialRepository implements IPolicialRepository {
  constructor(private readonly policialRepository = AppDataSource.getRepository(Policial)) {}

  public async create(batalhaoId: string, data: Partial<Policial>): Promise<Policial> {
    const policial = this.policialRepository.create({
      ...data,
      batalhao: { id: batalhaoId },
    });

    const savedPolicial = await this.policialRepository.save(policial);

    return this.policialRepository.findOneOrFail({
      where: { id: savedPolicial.id },
      relations: ["roles", "batalhao"],
    });
  }

  public async save(policial: Policial): Promise<Policial> {
    return await this.policialRepository.save(policial);
  }

  public async findById(id: string): Promise<Policial | null> {
    return await this.policialRepository
      .createQueryBuilder("policial")
      .leftJoinAndSelect("policial.batalhao", "batalhao")
      .leftJoinAndSelect("policial.roles", "role")
      .select([
        "policial.id",
        "policial.nome",
        "policial.matricula",
        "policial.cpf",
        "policial.contato",
        "policial.email",
        "policial.postoGraduacao",
        "policial.dataAdmissao",
        "batalhao.nome",
        "role.role",
      ])
      .where("policial.id = :id", { id })
      .getOne();
  }

  public async updateBatalhao(id: string, data: DeepPartial<Policial>): Promise<Policial> {
    const policial = await this.policialRepository.findOneOrFail({ where: { id } });

    const updatedPolicia = this.policialRepository.merge(policial, data);
    await this.policialRepository.save(updatedPolicia);
    return updatedPolicia;
  }

  public async updatePostoGraduacao(id: string, data: DeepPartial<Policial>): Promise<Policial> {
    const policial = await this.policialRepository.findOneOrFail({
      where: { id },
    });

    const updatedPolicial = this.policialRepository.merge(policial, data);
    await this.policialRepository.save(updatedPolicial);

    return this.policialRepository.findOneOrFail({
      where: { id },
      relations: ["batalhao"],
      select: ["id", "nome", "matricula", "postoGraduacao", "batalhao"],
    });
  }

  public async findAll(
    page: number,
    limit: number,
    matricula?: string
  ): Promise<[Policial[], number]> {
    const queryBuilder = this.policialRepository
      .createQueryBuilder("policial")
      .leftJoin("policial.batalhao", "batalhao")
      .select([
        "policial.id",
        "policial.nome",
        "policial.matricula",
        "policial.cpf",
        "policial.contato",
        "policial.email",
        "policial.postoGraduacao",
        "policial.dataAdmissao",
        "policial.createdAt",
        "policial.updatedAt",
        "batalhao.nome",
      ]);

    if (matricula) {
      queryBuilder.where("LOWER(policial.matricula) LIKE LOWER(:matricula)", {
        matricula: `%${matricula}%`,
      });
    }

    const [resul, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return [resul, total];
  }

  public async delete(id: string): Promise<void> {
    await this.policialRepository.delete(id);
  }

  public async updateRefreshToken(
    id: string,
    refreshToken: string,
    expiresIn: Date
  ): Promise<void> {
    await this.policialRepository.update(id, {
      refreshToken,
      refreshTokenExpiresIn: expiresIn,
    });
  }

  public async findByRefreshToken(refreshToken: string): Promise<Policial | null> {
    return this.policialRepository.findOne({
      where: { refreshToken },
      relations: ["roles"],
    });
  }

  async findByUserId(userId: string): Promise<Policial | null> {
    return this.policialRepository.findOne({
      where: { id: userId },
      relations: ["roles"],
    });
  }

  public async findByIds(ids: string[]): Promise<Policial[]> {
    return this.policialRepository.find({
      where: { id: In(ids) },
      relations: ["batalhao"],
    });
  }

  public async existsByMatricula(matricula: string): Promise<boolean> {
    const count = await this.policialRepository.count({ where: { matricula } });
    return count > 0;
  }

  public async existsByCpf(cpf: string): Promise<boolean> {
    const count = await this.policialRepository.count({ where: { cpf } });
    return count > 0;
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const count = await this.policialRepository.count({ where: { email } });
    return count > 0;
  }

  public async findByEmailWithRoles(email: string): Promise<Policial | null> {
    return await this.policialRepository.findOne({
      where: { email },
      relations: ["roles"],
    });
  }
}
