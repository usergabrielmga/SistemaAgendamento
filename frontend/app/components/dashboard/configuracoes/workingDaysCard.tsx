"use client";

import { useEffect, useState } from "react";
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

export default function WorkingDaysCard({
  workingHours,
  onSave,
}: Props) {

  const [days, setDays] = useState<WorkingHour[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
  setDays(workingHours);
}, [workingHours]);

useEffect(() => {
  const firstActive = workingHours.find((day) => day.is_active);

  if (!firstActive) return;

  setStartTime(firstActive.start_time?.slice(0, 5) ?? "");
  setEndTime(firstActive.end_time?.slice(0, 5) ?? "");
}, [workingHours]);

 const toggleDay = (dayOfWeek: number) => {
    setDays((current) =>
      current.map((day) =>
        day.day_of_week === dayOfWeek
          ? {
              ...day,
              is_active: !day.is_active,
            }
          : day
      )
    );
  }

  const handleSave = () => {
    const payload = days.map((day) => ({
      ...day,
      start_time: day.is_active ? startTime : null,
      end_time: day.is_active ? endTime : null,
    }));

    onSave(payload);
  }

  return (
    <div className="rounded-2xl border border-[#ECE7E3] bg-white p-5 w-full max-w-[860px] mx-auto">

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
          onClick={handleSave}
          className="h-10 rounded-lg bg-[#4D2615] px-5 text-sm font-medium text-white transition hover:bg-[#3A1C10] font-sans cursor-pointer"
        >
          Salvar
        </button>

      </div>

      <div className="mt-5">

        <label className="mb-2 block text-xs font-sans font-semibold uppercase tracking-wider text-[#8B4513]">
          Dias
        </label>

        <div className="flex flex-wrap gap-2">

          {days.map((day) => (

            <button
              key={day.day_of_week}
              type="button"
              onClick={() => toggleDay(day.day_of_week)}
              className={`h-9 rounded-full px-4 text-[13px] font-sans transition font-bold
                ${
                  day.is_active
                    ? "bg-[#4D2615] text-white"
                    : "border border-[#E8E8E8] bg-[#F7F7F7] text-[#666]"
                }`}
            >
              {DAYS[day.day_of_week]}
            </button>

          ))}

        </div>

      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">

        <div>

          <label className="mb-1 block text-xs font-medium text-[#C97B63] font-sans">
            Abertura
          </label>

          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="h-10 w-full rounded-lg border font-sans text-black border-[#E5E5E5] bg-[#FAFAFA] px-3 text-sm outline-none transition focus:border-[#8d5c47] focus:bg-white"
          />

        </div>

        <div>

          <label className="mb-1 block text-xs font-medium text-[#C97B63] font-sans">
            Fechamento
          </label>

          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="h-10 w-full rounded-lg text-black font-sans border border-[#E5E5E5] bg-[#FAFAFA] px-3 text-sm outline-none transition focus:border-[#8d5c47] focus:bg-white"
          />

        </div>

      </div>

    </div>
  );
}