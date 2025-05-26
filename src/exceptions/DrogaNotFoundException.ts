import AppError from "../errors/AppError";

export default class DrogaNotFoundException extends AppError {
  constructor() {
    super("Droga não registrada na base de dados.", 404);
  }
}
