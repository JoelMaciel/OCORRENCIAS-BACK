import { Router } from "express";
import { VeiculoController } from "../controllers/veiculo";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureAdmin } from "../../../middleware/ensureAdmin";

const veiculosRoutes = Router();

const veiculoController = new VeiculoController();

veiculosRoutes.use(ensureAuthenticated);

veiculosRoutes.post("/:id", veiculoController.create);
veiculosRoutes.delete("/:id", ensureAdmin, veiculoController.delete);
veiculosRoutes.put("/:id", veiculoController.update);
veiculosRoutes.get("/:id", veiculoController.findById);
veiculosRoutes.get("/", ensureAdmin, veiculoController.findAll);

export { veiculosRoutes };
