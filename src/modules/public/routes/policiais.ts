import { Router } from "express";
import { PoliciasController } from "../controllers/policiais";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureRoot } from "../../../middleware/ensureRoot";
import { ensureAdmin } from "../../../middleware/ensureAdmin";

const policiaisRoutes = Router();

const policiaisController = new PoliciasController();

policiaisRoutes.use(ensureAuthenticated);

policiaisRoutes.post("/:id", ensureRoot, policiaisController.create);
policiaisRoutes.get("/", ensureAdmin, policiaisController.findAll);
policiaisRoutes.get("/:id", policiaisController.findById);
policiaisRoutes.delete("/:id", ensureRoot, policiaisController.delete);
policiaisRoutes.patch("/:id/batalhao", ensureAdmin, policiaisController.updateBatalhao);
policiaisRoutes.patch(
  "/:id/posto-graduacao",
  ensureAdmin,
  policiaisController.updatePostoGraduacao
);

export { policiaisRoutes };
