import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const workingHourItemSchema = z.object({
  id_working_hour: z.number(),
  day_of_week: z.number().min(0).max(6),
  is_active: z.boolean(),
  start_time: z.string().nullable(),
  end_time: z.string().nullable(),
});

export const workingHoursSchema = z
  .object({
    days: z
      .array(workingHourItemSchema)
      .refine(
        (days) => days.some((day) => day.is_active),
        {
          message:
            "Selecione pelo menos um dia de atendimento.",
        }
      ),

    startTime: z
      .string()
      .trim()
      .min(1, "Informe o horário de abertura.")
      .regex(timeRegex, "Horário de abertura inválido."),

    endTime: z
      .string()
      .trim()
      .min(1, "Informe o horário de fechamento.")
      .regex(timeRegex, "Horário de fechamento inválido."),
  })
  .refine(
    ({ startTime, endTime }) => startTime < endTime,
    {
      message:
        "O horário de fechamento deve ser maior que o horário de abertura.",
      path: ["endTime"],
    }
  );

export type WorkingHoursFormData = z.infer<
  typeof workingHoursSchema
>;