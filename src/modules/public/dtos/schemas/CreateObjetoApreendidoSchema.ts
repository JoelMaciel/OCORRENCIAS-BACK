import { z } from "zod";

export const CreateObjetoApreendidoSchema = z.object({
  descricao: z
    .string({ required_error: "O campo descrição é obrigatório." })
    .min(5, { message: "A descrição deve ter no mínimo 5 caracteres." })
    .max(500, { message: "A descrição deve ter no máximo 500 caracteres." }),
});

export type ObjetoApreendidoRequestDTO = z.infer<typeof CreateObjetoApreendidoSchema>;
