import { Droga } from "../../entities/Droga";

export class DrogaResponseDTO {
  id: string;
  tipo: string;
  quantidade: string;
  unidadeMedida: string;
  occorrenciaId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(droga: Droga) {
    this.id = droga.id;
    this.tipo = droga.tipo;
    this.quantidade = droga.quantidade;
    this.unidadeMedida = droga.unidadeMedida;
    this.occorrenciaId = droga.ocorrencia.id;
    this.createdAt = droga.createdAt;
    this.updatedAt = droga.updatedAt;
  }
}
