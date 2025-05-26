import { Router } from "express";
import { DrogaController } from "../controllers/droga";

const drogasRoutes = Router();

const drogasController = new DrogaController();

drogasRoutes.post("/:id", drogasController.create);
drogasRoutes.delete("/:id", drogasController.delete);
drogasRoutes.put("/:id", drogasController.update);
drogasRoutes.get("/:id", drogasController.findById);
drogasRoutes.get("/", drogasController.findAll);

export { drogasRoutes };
