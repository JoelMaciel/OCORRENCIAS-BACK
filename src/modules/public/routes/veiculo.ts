import { Router } from "express";
import { VeiculoController } from "../controllers/veiculo";

const veiculosRoutes = Router();

const veiculoController = new VeiculoController();

veiculosRoutes.post("/:id", veiculoController.create);
veiculosRoutes.delete("/:id", veiculoController.delete);
veiculosRoutes.put("/:id", veiculoController.update);
veiculosRoutes.get("/:id", veiculoController.findById);
veiculosRoutes.get("/", veiculoController.findAll);

export { veiculosRoutes };
