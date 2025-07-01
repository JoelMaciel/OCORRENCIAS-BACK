import { Router } from "express";
import { ArmasController } from "../controllers/armas";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";
import { ensureAdmin } from "../../../middleware/ensureAdmin";

const armasRoutes = Router();
const armasContoller = new ArmasController();

armasRoutes.use(ensureAuthenticated);

armasRoutes.post("/:id", armasContoller.create);
armasRoutes.get("/:id", armasContoller.findById);
armasRoutes.put("/:id", armasContoller.update);
armasRoutes.get("/", ensureAdmin, armasContoller.findAll);
armasRoutes.delete("/:id", ensureAdmin, armasContoller.delete);

export { armasRoutes };
