import { Router } from "express";
import { ObjetoApreendidoController } from "../controllers/objeto_apreendido";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureAdmin } from "../../../middleware/ensureAdmin";

const objetosRoutes = Router();

const objetosController = new ObjetoApreendidoController();

objetosRoutes.use(ensureAuthenticated);

objetosRoutes.post("/:id", objetosController.create);
objetosRoutes.delete("/:id", ensureAdmin, objetosController.delete);
objetosRoutes.put("/:id", objetosController.update);
objetosRoutes.get("/:id", objetosController.findById);
objetosRoutes.get("/", ensureAdmin, objetosController.findAll);

export { objetosRoutes };
