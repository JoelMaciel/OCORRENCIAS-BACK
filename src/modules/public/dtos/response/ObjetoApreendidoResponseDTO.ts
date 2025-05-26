import { ObjetoApreendido } from "../../entities/ObjetoApreendido";

export class ObjetoApreendidoResponseDTO {
  id: string;
  descricao: string;
  ocorrenciaId: string;

  constructor(objeto: ObjetoApreendido) {
    this.id = objeto.id;
    this.descricao = objeto.descricao;
    this.ocorrenciaId = objeto.ocorrencia.id;
  }
}
