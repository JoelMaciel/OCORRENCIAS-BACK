import AppError from "../errors/AppError";

export default class VitimaNotFoundException extends AppError {
  constructor() {
    super("Vitima não registrada na base de dados.", 404);
  }
}
