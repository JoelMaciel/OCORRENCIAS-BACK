import { Router } from "express";
import { ObjetoApreendidoController } from "../controllers/objeto_apreendido";

const objetosRoutes = Router();

const objetosController = new ObjetoApreendidoController();

objetosRoutes.post("/:id", objetosController.create);
objetosRoutes.delete("/:id", objetosController.delete);
objetosRoutes.put("/:id", objetosController.update);
objetosRoutes.get("/:id", objetosController.findById);
objetosRoutes.get("/", objetosController.findAll);

export { objetosRoutes };
