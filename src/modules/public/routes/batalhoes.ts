import { Router } from "express";
import { BatalhoesController } from "../controllers/batalhoes";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureRoot } from "../../../middleware/ensureRoot";
import { ensureAdmin } from "../../../middleware/ensureAdmin";

const batalhoesRoutes = Router();
const batalhoesController = new BatalhoesController();

batalhoesRoutes.use(ensureAuthenticated);

batalhoesRoutes.post("/", ensureRoot, batalhoesController.create);
batalhoesRoutes.get("/:id", batalhoesController.findById);
batalhoesRoutes.delete("/:id", ensureRoot, batalhoesController.delete);
batalhoesRoutes.get("/", ensureAdmin, batalhoesController.findAll);
batalhoesRoutes.put("/:id", ensureRoot, batalhoesController.update);

export { batalhoesRoutes };
