import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CriarVitimaUseCase } from "../usecases/vitima/criar-vitima";
import { CreateVitimaSchema } from "../dtos/schemas/CreateVitimaSchema";
import { AtualizarVitimaUseCase } from "../usecases/vitima/atualizar-vitima";
import { UpdateVitimaSchema } from "../dtos/schemas/UpdateVitimaSchema";
import { BuscaVitimaUseCase } from "../usecases/vitima/busca-vitima";
import { DeletarVitimaUseCase } from "../usecases/vitima/deletar-vitima";
import { ListarVitimaUseCase } from "../usecases/vitima/listar-vitima";

export class VitimaController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const criaVitimaUseCase = container.resolve(CriarVitimaUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(CreateVitimaSchema, req.body);

      const acusado = await criaVitimaUseCase.execute(id, dto);

      res.status(201).json(acusado);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listaVitimaUseCase = container.resolve(ListarVitimaUseCase);
      const page = parseInt(req.query.page as string, 10) || 1;
      const size = parseInt(req.query.limit as string, 10) || 10;
      const nome = (req.query.nome as string) || undefined;
      const cpf = (req.query.cpf as string) || undefined;

      const result = await listaVitimaUseCase.execute(page, size, nome, cpf);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscaVitimaUseCase = container.resolve(BuscaVitimaUseCase);
      const { id } = req.params;
      const vitima = await buscaVitimaUseCase.execute(id);
      res.status(200).json(vitima);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const atualizaVitimaUseCase = container.resolve(AtualizarVitimaUseCase);
      const { id } = req.params;
      const dto = await ValidationSchema.validate(UpdateVitimaSchema, req.body);
      const vitima = await atualizaVitimaUseCase.execute(id, dto);
      res.status(200).json(vitima);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const deletaVitimaUseCase = container.resolve(DeletarVitimaUseCase);
      const { id } = req.params;
      await deletaVitimaUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
