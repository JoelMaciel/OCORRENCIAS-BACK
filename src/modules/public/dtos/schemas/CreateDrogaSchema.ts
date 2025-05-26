import { z } from "zod";

export const CreateDrogaSchema = z.object({
  tipo: z
    .string({ required_error: "O campo tipo é obrigatório." })
    .min(2, { message: "O campo tipo deve ter no mínimo 2 caracteres." }),
  quantidade: z
    .string({ required_error: "O campo quantidade é obrigatório." })
    .min(1, { message: "O campo quantidade deve ter no mínimo 1 caractere." }),
  unidadeMedida: z.string().refine(
    (value) => {
      const validValues = ["mg", "g", "kg", "t"];
      return validValues.includes(value);
    },
    {
      message: "O valor para 'unidadeMedida' é inválido. Escolha entre 'mg', 'g', 'kg' ou 't'.",
    }
  ),
});

export type DrogaRequestDTO = z.infer<typeof CreateDrogaSchema>;
