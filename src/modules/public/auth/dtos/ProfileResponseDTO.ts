export class ProfileResponseDTO {
  id: string;
  nome: string;
  matricula: string;
  email: string;
  postoGraduacao: string;
  roles: string[];
  batalhao?: string;
  dataAdmissao?: Date;
  contato?: string;

  constructor(
    id: string,
    nome: string,
    matricula: string,
    email: string,
    postoGraduacao: string,
    roles: string[],
    batalhao?: string,
    dataAdmissao?: Date,
    contato?: string
  ) {
    this.id = id;
    this.nome = nome;
    this.matricula = matricula;
    this.email = email;
    this.postoGraduacao = postoGraduacao;
    this.roles = roles;
    this.batalhao = batalhao;
    this.dataAdmissao = dataAdmissao;
    this.contato = contato;
  }
}
