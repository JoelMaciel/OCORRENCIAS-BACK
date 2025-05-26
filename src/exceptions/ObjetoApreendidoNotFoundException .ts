import AppError from "../errors/AppError";

export default class ObjetoApreendidoNotFoundException extends AppError {
  constructor() {
    super("Objeto apreendido não registrado na base de dados.", 404);
  }
}
