import { VeiculoApreendido } from "../../entities/VeiculoApreendido";

export class VeiculoResponseDTO {
  id: string;
  tipo: string;
  placa: string;
  modelo: string;
  cor: string;
  situacao: string;
  ocorrenciaId: string;
  observacoes?: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(veiculo: VeiculoApreendido) {
    this.id = veiculo.id;
    this.tipo = veiculo.tipo;
    this.placa = veiculo.placa;
    this.modelo = veiculo.modelo;
    this.cor = veiculo.cor;
    this.situacao = veiculo.situacao;
    this.ocorrenciaId = veiculo.ocorrencia.id;
    this.observacoes = veiculo.observacoes || null;
    this.createdAt = veiculo.createdAt;
    this.updatedAt = veiculo.updatedAt;
  }
}
