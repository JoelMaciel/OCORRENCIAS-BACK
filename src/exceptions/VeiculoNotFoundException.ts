import AppError from "../errors/AppError";

export default class VeiculoNotFoundException extends AppError {
  constructor() {
    super("Veiculo não registrado na base de dados.", 404);
  }
}
