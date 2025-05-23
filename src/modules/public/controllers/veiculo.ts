import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CadastrarVeiculoUseCase } from "../usecases/veiculo/cadastrar-veiculo";
import { CreateVeiculoSchema } from "../dtos/schemas/CreateVeiculoSchema";
import { BuscarVeiculoUseCase } from "../usecases/veiculo/buscar-veiculo";
import { AtualizarVeiculoUseCase } from "../usecases/veiculo/atualizar-veiculo";
import { DeletarVeiculoUseCase } from "../usecases/veiculo/deletar-veiculo";
import { ListarVeiculoUseCase } from "../usecases/veiculo/listar-veiculo";

export class VeiculoController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const cadastrarVeiculoUseCase = container.resolve(CadastrarVeiculoUseCase);
      const dto = await ValidationSchema.validate(CreateVeiculoSchema, req.body);

      const veiculo = await cadastrarVeiculoUseCase.execute(id, dto);

      res.status(201).json(veiculo);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listarVeiculoUseCase = container.resolve(ListarVeiculoUseCase);
      const page = parseInt(req.query.page as string, 10) || 1;
      const size = parseInt(req.query.size as string, 10) || 10;
      const placa = (req.query.placa as string)?.trim() || undefined;

      const result = await listarVeiculoUseCase.execute(page, size, placa);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const buscarVeiculoUseCase = container.resolve(BuscarVeiculoUseCase);
      const veiculo = await buscarVeiculoUseCase.execute(id);
      res.status(200).json(veiculo);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizarVeiculoUseCase = container.resolve(AtualizarVeiculoUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(CreateVeiculoSchema, req.body);
      const veiculo = await atualizarVeiculoUseCase.execute(id, dto);
      res.status(200).json(veiculo);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deletarVeiculoUseCase = container.resolve(DeletarVeiculoUseCase);
      const { id } = req.params;
      await deletarVeiculoUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
