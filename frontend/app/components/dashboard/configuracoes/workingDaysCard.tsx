"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  workingHoursSchema,
  WorkingHoursFormData,
} from "@/app/schemas/dashboard/working-hours.schema";
import { WorkingHour } from "@/app/types/dashboard/workingHours.type";

interface Props {
  workingHours: WorkingHour[];
  onSave: (data: WorkingHour[]) => void;
}

const DAYS = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sáb",
] as const;

export default function WorkingDaysCard({ workingHours, onSave }: Props) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<WorkingHoursFormData>({
    resolver: zodResolver(workingHoursSchema),
    defaultValues: {
      days: [],
      startTime: "",
      endTime: "",
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "days",
  });

  const watchDays = watch("days");

  useEffect(() => {
    if (!workingHours || workingHours.length === 0) return;

    const firstActive = workingHours.find((day) => day.is_active);

    reset({
      days: workingHours,
      startTime: firstActive?.start_time?.slice(0, 5) ?? "",
      endTime: firstActive?.end_time?.slice(0, 5) ?? "",
    });
  }, [workingHours, reset]);

  const toggleDay = (index: number) => {
    const currentValue = watchDays[index]?.is_active;
    setValue(`days.${index}.is_active`, !currentValue, {
      shouldValidate: true,
    });
  };

  const onSubmit = (formData: WorkingHoursFormData) => {
    const payload: WorkingHour[] = formData.days.map((day) => ({
      ...day,
      start_time: day.is_active ? formData.startTime : null,
      end_time: day.is_active ? formData.endTime : null,
    }));

    onSave(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-[#ECE7E3] bg-white p-5 w-full max-w-[860px] mx-auto"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-serif font-bold text-[#1B120D]">
            Horário de funcionamento
          </h2>

          <p className="mt-1 font-sans text-sm text-[#C97B63]">
            Selecione os dias de atendimento.
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-10 rounded-lg bg-[#4D2615] px-5 text-sm font-medium text-white transition hover:bg-[#3A1C10] font-sans cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-xs font-sans font-semibold uppercase tracking-wider text-[#8B4513]">
          Dias
        </label>

        <div className="flex flex-wrap gap-2">
          {fields.map((field, index) => {
            const isActive = watchDays?.[index]?.is_active;

            return (
              <button
                key={field.id}
                type="button"
                onClick={() => toggleDay(index)}
                className={`h-9 rounded-full px-4 text-[13px] font-sans transition font-bold cursor-pointer ${
                  isActive
                    ? "bg-[#4D2615] text-white"
                    : "border border-[#E8E8E8] bg-[#F7F7F7] text-[#666]"
                }`}
              >
                {DAYS[field.day_of_week]}
              </button>
            );
          })}
        </div>

        {errors.days?.root && (
          <span className="text-xs text-red-500 mt-1.5 block">
            {errors.days.root.message}
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-[#C97B63] font-sans">
            Abertura
          </label>

          <input
            type="time"
            {...register("startTime")}
            className="h-10 w-full rounded-lg border font-sans text-black border-[#E5E5E5] bg-[#FAFAFA] px-3 text-sm outline-none transition focus:border-[#8d5c47] focus:bg-white"
          />

          {errors.startTime && (
            <span className="text-xs text-red-500 mt-1 block">
              {errors.startTime.message}
            </span>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#C97B63] font-sans">
            Fechamento
          </label>

          <input
            type="time"
            {...register("endTime")}
            className="h-10 w-full rounded-lg text-black font-sans border border-[#E5E5E5] bg-[#FAFAFA] px-3 text-sm outline-none transition focus:border-[#8d5c47] focus:bg-white"
          />

          {errors.endTime && (
            <span className="text-xs text-red-500 mt-1 block">
              {errors.endTime.message}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}