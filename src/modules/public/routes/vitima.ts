import { Router } from "express";
import { VitimaController } from "../controllers/vitima";

const vitimasRoutes = Router();

const vitimasController = new VitimaController();

vitimasRoutes.post("/:id", vitimasController.create);
vitimasRoutes.delete("/:id", vitimasController.delete);
vitimasRoutes.put("/:id", vitimasController.update);
vitimasRoutes.get("/:id", vitimasController.findById);
vitimasRoutes.get("/", vitimasController.findAll);

export { vitimasRoutes };
