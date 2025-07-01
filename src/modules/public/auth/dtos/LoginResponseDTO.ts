import { Policial } from "../../entities/Policial";

export class LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  policial: {
    id: string;
    nome: string;
    matricula: string;
    roles: string[];
  };

  constructor(policial: Policial, accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.policial = {
      id: policial.id,
      nome: policial.nome,
      matricula: policial.matricula,
      roles: policial.roles.map((r) => r.role),
    };
  }
}
