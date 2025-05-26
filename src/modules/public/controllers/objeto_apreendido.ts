import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { ValidationSchema } from "../dtos/validation/ValidateSchema";
import { CreateObjetoApreendidoSchema } from "../dtos/schemas/CreateObjetoApreendidoSchema";
import { RegistrarObjetoApreendidoUseCase } from "../usecases/objeto_apreendido/registrar-objeto";
import { BuscaObjetoUseCase } from "../usecases/objeto_apreendido/busca-objeto";
import { AtualizarObjetoApreendidoUseCase } from "../usecases/objeto_apreendido/atualizar-objeto";
import { ListarObjetoUseCase } from "../usecases/objeto_apreendido/listar-objeto";
import { DeletarObjetoUseCase } from "../usecases/objeto_apreendido/deletar-objeto";

export class ObjetoApreendidoController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const registrarObjetoUseCase = container.resolve(RegistrarObjetoApreendidoUseCase);

      const dto = await ValidationSchema.validate(CreateObjetoApreendidoSchema, req.body);

      const objeto = await registrarObjetoUseCase.execute(id, dto);

      res.status(201).json(objeto);
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const listarObjetoUseCase = container.resolve(ListarObjetoUseCase);
      const page = parseInt(req.query.page as string, 10) || 1;
      const size = parseInt(req.query.limit as string, 10) || 10;
      const ocorrenciaId = (req.query.ocorrenciaId as string) || undefined;
      const result = await listarObjetoUseCase.execute(page, size, ocorrenciaId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const buscaObjetoUseCase = container.resolve(BuscaObjetoUseCase);
      const { id } = req.params;
      const objeto = await buscaObjetoUseCase.execute(id);
      res.status(200).json(objeto);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const atualizaObjetoUseCase = container.resolve(AtualizarObjetoApreendidoUseCase);
      const dto = await ValidationSchema.validate(CreateObjetoApreendidoSchema, req.body);
      const objeto = await atualizaObjetoUseCase.execute(id, dto);
      res.status(200).json(objeto);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deletaObjetoUseCase = container.resolve(DeletarObjetoUseCase);
      await deletaObjetoUseCase.execute(id);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
