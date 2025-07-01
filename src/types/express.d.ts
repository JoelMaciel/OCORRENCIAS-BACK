declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        nome: string;
        matricula: string;
        roles: string[];
      };
    }
  }
}

export {};
