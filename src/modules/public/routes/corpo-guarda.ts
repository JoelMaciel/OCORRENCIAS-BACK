import { Router } from "express";
import { CorpoGuardaController } from "../controllers/corpo_guarda";

const corpoGuardaRoutes = Router();

const corpoGuardaController = new CorpoGuardaController();

corpoGuardaRoutes.post("/", corpoGuardaController.create);
corpoGuardaRoutes.patch("/:id", corpoGuardaController.update);
corpoGuardaRoutes.get("/:id", corpoGuardaController.findById);
corpoGuardaRoutes.get("/", corpoGuardaController.findAll);

export { corpoGuardaRoutes };
