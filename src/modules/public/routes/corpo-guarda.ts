import { Router } from "express";
import { CorpoGuardaController } from "../controllers/corpo_guarda";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureAdmin } from "../../../middleware/ensureAdmin";

const corpoGuardaRoutes = Router();

const corpoGuardaController = new CorpoGuardaController();

corpoGuardaRoutes.use(ensureAuthenticated);

corpoGuardaRoutes.post("/", corpoGuardaController.create);
corpoGuardaRoutes.patch("/:id", corpoGuardaController.update);
corpoGuardaRoutes.get("/:id", corpoGuardaController.findById);
corpoGuardaRoutes.get("/", ensureAdmin, corpoGuardaController.findAll);

export { corpoGuardaRoutes };
