import { z } from "zod";

const phoneRegex =
  /^\(?\d{2}\)?\s?(9?\d{4})-?\d{4}$/;

const emailSchema = z.string().email();

export const bookingSchema = z.object({
  name: z
    .string({
      error: "Informe seu nome.",
    })
    .trim()
    .min(3, "O nome deve possuir no mínimo 3 caracteres.")
    .max(100, "O nome deve possuir no máximo 100 caracteres."),

  phone: z
    .string({
      error: "Informe seu telefone.",
    })
    .trim()
    .min(1, "Informe seu telefone.")
    .regex(
      phoneRegex,
      "Informe um telefone válido."
    ),

 email: z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) =>
      value === "" ||
      emailSchema.safeParse(value).success,
    {
      message: "Informe um e-mail válido.",
    }
  ),

  observations: z
    .string()
    .trim()
    .max(
      500,
      "As observações devem possuir no máximo 500 caracteres."
    )
    .optional(),
});

export type BookingFormData = z.infer<
  typeof bookingSchema
>;