import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { RegistrarDrogaUseCase } from "../usecases/droga/criar-droga";
import { CreateDrogaSchema } from "../dtos/schemas/CreateDrogaSchema";
import { BuscarDrogaUseCase } from "../usecases/droga/busca-droga";
import { AtualizarDrogaUseCase } from "../usecases/droga/atualizar-droga";
import { ListarDrogaUseCase } from "../usecases/droga/listar-droga";
import { DeletarDrogaUseCase } from "../usecases/droga/deletar-droga";

export class DrogaController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const registrarDrogaUseCase = container.resolve(RegistrarDrogaUseCase);
      const dto = await ValidationSchema.validate(CreateDrogaSchema, req.body);

      const droga = await registrarDrogaUseCase.execute(id, dto);

      res.status(201).json(droga);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listarDrogaUseCase = container.resolve(ListarDrogaUseCase);
      const page = parseInt(req.query.page as string, 10) || 1;
      const size = parseInt(req.query.size as string, 10) || 10;
      const tipo = (req.query.tipo as string) || undefined;

      const result = await listarDrogaUseCase.execute(page, size, tipo);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const buscarDrogaUseCase = container.resolve(BuscarDrogaUseCase);
      const droga = await buscarDrogaUseCase.execute(id);
      res.status(200).json(droga);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const atualizarDrogaUseCase = container.resolve(AtualizarDrogaUseCase);
      const dto = await ValidationSchema.validate(CreateDrogaSchema, req.body);
      const droga = await atualizarDrogaUseCase.execute(id, dto);
      res.status(200).json(droga);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deletarDrogaUseCase = container.resolve(DeletarDrogaUseCase);
      const { id } = req.params;
      await deletarDrogaUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
