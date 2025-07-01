import { Router } from "express";
import { AcusadosController } from "../controllers/acusados";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureAdmin } from "../../../middleware/ensureAdmin";

const acusadosRoutes = Router();

const acusadosController = new AcusadosController();

acusadosRoutes.use(ensureAuthenticated);

acusadosRoutes.post("/:id", acusadosController.create);
acusadosRoutes.put("/:id", acusadosController.update);
acusadosRoutes.get("/:id", acusadosController.findById);
acusadosRoutes.get("/", acusadosController.findAll);
acusadosRoutes.delete("/:id", ensureAdmin, acusadosController.delete);

export { acusadosRoutes };
