

import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const blockedDateSchema = z
  .object({
    block_date: z
      .string({
        error: "Informe a data do bloqueio.",
      })
      .min(1, "Informe a data do bloqueio."),

    start_time: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),

    end_time: z
      .string()
      .trim()
      .optional()
      .or(z.literal("")),

    reason: z
      .string({
        error: "Informe o motivo do bloqueio.",
      })
      .trim()
      .max(
        255,
        "O motivo deve possuir no máximo 255 caracteres."
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    const hasStart = !!data.start_time;
    const hasEnd = !!data.end_time;

    if (hasStart && !timeRegex.test(data.start_time!)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["start_time"],
        message: "Horário inicial inválido.",
      });
    }

    if (hasEnd && !timeRegex.test(data.end_time!)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["end_time"],
        message: "Horário final inválido.",
      });
    }

    if (hasStart !== hasEnd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["start_time"],
        message:
          "Informe o horário inicial e o horário final.",
      });
    }

    if (hasStart && hasEnd && data.start_time! >= data.end_time!) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["end_time"],
        message:
          "O horário final deve ser maior que o horário inicial.",
      });
    }
  });

export type BlockedDateFormData = z.infer<
  typeof blockedDateSchema
>;