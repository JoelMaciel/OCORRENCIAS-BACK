import { AppDataSource } from "../../../../ormconfig";
import { VeiculoApreendido } from "../entities/VeiculoApreendido";
import { IVeiculoRepository } from "./interfaces/IVeiculoRepository";

export class VeiculoRepository implements IVeiculoRepository {
  constructor(
    private readonly veiculoRepository = AppDataSource.getRepository(VeiculoApreendido)
  ) {}

  public async create(data: Partial<VeiculoApreendido>): Promise<VeiculoApreendido> {
    const veiculo = this.veiculoRepository.create(data);
    return await this.veiculoRepository.save(veiculo);
  }

  public async findAll(
    page: number,
    size: number,
    placa?: string
  ): Promise<[VeiculoApreendido[], number]> {
    const queryBuilder = this.veiculoRepository
      .createQueryBuilder("veiculo")
      .leftJoinAndSelect("veiculo.ocorrencia", "ocorrencia");

    if (placa) {
      queryBuilder.where("LOWER(veiculo.placa) ILIKE LOWER(:placa)", { placa: `%${placa}%` });
    }

    const [result, total] = await queryBuilder
      .orderBy("veiculo.createdAt", "DESC")
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();

    return [result, total];
  }

  public async findById(id: string): Promise<VeiculoApreendido | null> {
    return await this.veiculoRepository.findOne({
      where: { id },
      relations: ["ocorrencia"],
    });
  }

  public async update(id: string, data: Partial<VeiculoApreendido>): Promise<VeiculoApreendido> {
    const veiculo = await this.veiculoRepository.findOneOrFail({
      where: { id },
      relations: ["ocorrencia"],
    });

    const updatedVeiculo = this.veiculoRepository.merge(veiculo, data);

    return this.veiculoRepository.save(updatedVeiculo);
  }

  public async delete(veiculo: VeiculoApreendido): Promise<void> {
    await this.veiculoRepository.remove(veiculo);
  }
}
