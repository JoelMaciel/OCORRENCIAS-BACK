import { Router } from "express";
import { DrogaController } from "../controllers/droga";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureAdmin } from "../../../middleware/ensureAdmin";

const drogasRoutes = Router();

const drogasController = new DrogaController();

drogasRoutes.use(ensureAuthenticated);

drogasRoutes.post("/:id", drogasController.create);
drogasRoutes.delete("/:id", ensureAdmin, drogasController.delete);
drogasRoutes.put("/:id", drogasController.update);
drogasRoutes.get("/:id", drogasController.findById);
drogasRoutes.get("/", ensureAdmin, drogasController.findAll);

export { drogasRoutes };
