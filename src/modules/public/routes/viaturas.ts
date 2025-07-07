import { Request, Response, Router } from "express";
import { ViaturasController } from "../controllers/viaturas";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureAdmin } from "../../../middleware/ensureAdmin";
import { ensureRoot } from "../../../middleware/ensureRoot";

const viaturasRoutes = Router();

const viaturasController = new ViaturasController();

viaturasRoutes.use(ensureAuthenticated);

viaturasRoutes.post("/", ensureRoot, viaturasController.create);
viaturasRoutes.delete("/:id", ensureRoot, viaturasController.delete);
viaturasRoutes.get("/:id", viaturasController.findById);
viaturasRoutes.get("/", ensureAdmin, viaturasController.findAll);
viaturasRoutes.put("/:id", ensureAdmin, viaturasController.update);
viaturasRoutes.patch("/vincula-ocorrencia", viaturasController.vincularOcorrencia);
viaturasRoutes.patch("/:id/atualiza-status", ensureAdmin, viaturasController.updateStatus);

export { viaturasRoutes };
