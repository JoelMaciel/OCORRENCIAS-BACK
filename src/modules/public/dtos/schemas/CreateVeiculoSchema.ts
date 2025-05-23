import { z } from "zod";
import { EnderecoSchema } from "./EnderecoSchema";

export const CreateVeiculoSchema = z.object({
  tipo: z
    .string({ message: "O campo tipo é obrigatório." })
    .min(3, { message: "O campo tipo deve ter no minimo 3 caracteres." }),
  placa: z
    .string({ message: "O campo placa é obrigatório." })
    .min(5, { message: "O campo placa deve ter no minimo 3 caracteres." }),
  modelo: z
    .string({ message: "O campo modelo é obrigatório." })
    .min(5, { message: "O campo modelo deve ter no minimo 5 caracteres." }),
  cor: z
    .string({ message: "O campo cor é obrigatório." })
    .min(3, { message: "O campo cor deve ter no minimo 3 caracteres." }),
  situacao: z
    .string({ message: "O campo situacao é obrigatório." })
    .min(4, { message: "O campo situacao deve ter no minimo 4 caracteres." }),
  observacoes: z
    .string()
    .min(10, { message: "O campo observacoe' deve ter no mínimo 10 caracteres." })
    .optional(),
});

export type VeiculoRequestDTO = z.infer<typeof CreateVeiculoSchema>;
