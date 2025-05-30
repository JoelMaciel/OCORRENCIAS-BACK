import { container } from "tsyringe";
import { ViaturaRepository } from "../modules/public/repositories/ViaturaRepository";
import { BatalhaoRepository } from "../modules/public/repositories/BatalhaoRepository";
import { PolicialRepository } from "../modules/public/repositories/PolicialRepository";
import { CorpoGuardaRepository } from "../modules/public/repositories/CorpoGuardaRepository";
import { RoleRepository } from "../modules/public/repositories/RoleRepository";
import { AcusadoRepository } from "../modules/public/repositories/AcusadoRepository";
import { OcorrenciaRepository } from "../modules/public/repositories/OcorrenciaRepository";
import { OcorrenciaPolicialRepository } from "../modules/public/repositories/OcorrenciaPolicialRepository";
import { EnderecoRepository } from "../modules/public/repositories/EnderecoRepository";
import { ArmaRepository } from "../modules/public/repositories/ArmaRepository";
import { VitimaRepository } from "../modules/public/repositories/VitimaRepository";
import { VeiculoRepository } from "../modules/public/repositories/VeiculoRepository";
import { DrogaRepository } from "../modules/public/repositories/DrogaRepository ";
import { ObjetoApreendidoRepository } from "../modules/public/repositories/ObjetoApreendidoRepository";

container.registerSingleton("ViaturaRepository", ViaturaRepository);

container.registerSingleton("BatalhaoRepository", BatalhaoRepository);

container.registerSingleton("PolicialRepository", PolicialRepository);

container.registerSingleton("RoleRepository", RoleRepository);

container.registerSingleton("CorpoGuardaRepository", CorpoGuardaRepository);

container.registerSingleton("OcorrenciaRepository", OcorrenciaRepository);

container.registerSingleton("AcusadoRepository", AcusadoRepository);

container.registerSingleton("OcorrenciaPolicialRepository", OcorrenciaPolicialRepository);

container.registerSingleton("EnderecoRepository", EnderecoRepository);

container.registerSingleton("ArmaRepository", ArmaRepository);

container.registerSingleton("VitimaRepository", VitimaRepository);

container.registerSingleton("VeiculoRepository", VeiculoRepository);

container.registerSingleton("DrogaRepository", DrogaRepository);

container.registerSingleton("ObjetoApreendidoRepository", ObjetoApreendidoRepository);
