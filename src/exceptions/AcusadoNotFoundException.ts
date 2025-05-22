import AppError from "../errors/AppError";

export default class AcusadoNotFoundException extends AppError {
  constructor() {
    super("Acusado não registrado na base de dados.", 404);
  }
}
