import { Router } from "express";
import { VitimaController } from "../controllers/vitima";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureAdmin } from "../../../middleware/ensureAdmin";

const vitimasRoutes = Router();

const vitimasController = new VitimaController();

vitimasRoutes.use(ensureAuthenticated);

vitimasRoutes.post("/:id", vitimasController.create);
vitimasRoutes.delete("/:id", ensureAdmin, vitimasController.delete);
vitimasRoutes.put("/:id", vitimasController.update);
vitimasRoutes.get("/:id", vitimasController.findById);
vitimasRoutes.get("/", ensureAdmin, vitimasController.findAll);

export { vitimasRoutes };
