import { Router } from "express";
import { AuthController } from "../auth/controllers/auth";
import { ensureAuthenticated } from "../../../middleware/ensureAuthenticated";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.login);
authRoutes.post("/refresh-token", authController.refreshToken);
authRoutes.get("/profile", ensureAuthenticated, authController.profile);

export { authRoutes };
