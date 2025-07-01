import { Router } from "express";
import { viaturasRoutes } from "./modules/public/routes/viaturas";
import { batalhoesRoutes } from "./modules/public/routes/batalhoes";
import { policiaisRoutes } from "./modules/public/routes/policiais";
import { corpoGuardaRoutes } from "./modules/public/routes/corpo-guarda";
import { ocorrenciasRoutes } from "./modules/public/routes/ocorrencias";
import { acusadosRoutes } from "./modules/public/routes/acusados";
import { armasRoutes } from "./modules/public/routes/armas";
import { vitimasRoutes } from "./modules/public/routes/vitima";
import { veiculosRoutes } from "./modules/public/routes/veiculo";
import { drogasRoutes } from "./modules/public/routes/droga";
import { objetosRoutes } from "./modules/public/routes/objeto-apreendido";
import { authRoutes } from "./modules/public/routes/auth";

const routes = Router();

routes.use("/api/viaturas", viaturasRoutes);
routes.use("/api/batalhoes", batalhoesRoutes);
routes.use("/api/policiais", policiaisRoutes);
routes.use("/api/corpo-guarda", corpoGuardaRoutes);
routes.use("/api/ocorrencias", ocorrenciasRoutes);
routes.use("/api/acusados", acusadosRoutes);
routes.use("/api/armas", armasRoutes);
routes.use("/api/vitimas", vitimasRoutes);
routes.use("/api/veiculos", veiculosRoutes);
routes.use("/api/drogas", drogasRoutes);
routes.use("/api/objeto-apreendido", objetosRoutes);
routes.use("/api/auth", authRoutes);

export { routes };
