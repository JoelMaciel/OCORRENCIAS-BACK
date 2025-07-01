import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string({ required_error: "Campo obrigatório" }).email("E-mail inválido"),

  password: z
    .string({ required_error: "Campo password é obrigatório" })
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
});

export type LoginRequestDTO = z.infer<typeof LoginSchema>;
