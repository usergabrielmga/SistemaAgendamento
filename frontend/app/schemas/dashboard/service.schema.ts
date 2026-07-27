import { z } from "zod";

export const serviceSchema = z.object({
  name: z
    .string({
      error: "O nome do serviço é obrigatório.",
    })
    .trim()
    .min(3, "O nome deve possuir no mínimo 3 caracteres.")
    .max(100, "O nome deve possuir no máximo 100 caracteres."),

  description: z
    .string({
      error: "A descrição é obrigatória.",
    })
    .trim()
    .min(5, "A descrição deve possuir no mínimo 5 caracteres.")
    .max(255, "A descrição deve possuir no máximo 255 caracteres."),

  duration: z
    .number({
      error: "A duração deve ser um número.",
    })
    .min(15, "A duração mínima é de 15 minutos.")
    .max(480, "A duração máxima é de 480 minutos."),

  price: z
    .number({
      error: "O preço deve ser um número.",
    })
    .positive("O preço deve ser maior que R$ 0,00.")
    .max(10000, "O preço informado é muito alto."),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;