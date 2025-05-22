import { Vitima } from "../../entities/Vitima";

export class VitimaResponseDTO {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  nomeMae: string;
  nomePai?: string | null;
  naturalidade: string;
  nacionalidade: string;
  createdAt: Date;
  updatedAt: Date;
  endereco: {
    rua: string;
    numero: string;
    complemento?: string | null;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  } | null;

  constructor(vitima: Vitima) {
    this.id = vitima.id;
    this.nome = vitima.nome;
    this.cpf = vitima.cpf;
    this.dataNascimento = vitima.dataNascimento;
    this.nomeMae = vitima.nomeMae;
    this.nomePai = vitima.nomePai || "Não informado";
    this.naturalidade = vitima.naturalidade;
    this.nacionalidade = vitima.nacionalidade;
    this.createdAt = vitima.createdAt || new Date();
    this.updatedAt = vitima.updatedAt || new Date();

    if (vitima.endereco) {
      this.endereco = {
        rua: vitima.endereco.rua,
        numero: vitima.endereco.numero,
        complemento: vitima.endereco.complemento || null,
        bairro: vitima.endereco.bairro,
        cidade: vitima.endereco.cidade,
        uf: vitima.endereco.uf,
        cep: vitima.endereco.cep,
      };
    } else {
      this.endereco = null;
    }
  }
}
