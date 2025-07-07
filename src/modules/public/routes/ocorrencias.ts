import { Router } from "express";
import { OcorrenciasController } from "../controllers/ocorrencias";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureAdmin } from "../../../middleware/ensureAdmin";

const ocorrenciasRoutes = Router();

const ocorrenciasController = new OcorrenciasController();

ocorrenciasRoutes.use(ensureAuthenticated);

ocorrenciasRoutes.post("/", ocorrenciasController.create);
ocorrenciasRoutes.get("/:id", ocorrenciasController.findById);
ocorrenciasRoutes.patch("/:id", ocorrenciasController.update);
ocorrenciasRoutes.get("/", ocorrenciasController.findAll);
ocorrenciasRoutes.patch("/:id/concluir", ocorrenciasController.statusConcluded);
ocorrenciasRoutes.patch("/:id/cancelar", ocorrenciasController.statusCanceled);

export { ocorrenciasRoutes };
