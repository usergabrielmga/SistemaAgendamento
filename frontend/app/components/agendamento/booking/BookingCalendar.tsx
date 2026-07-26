"use client";

import {
  format,
  isBefore,
  isSameDay,
  isSameMonth,
} from "date-fns";

import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useCalendar } from "@/app/hooks/agendamento/useCalendar";
import { useAvailableDays } from "@/app/hooks/agendamento/queries/available-days.query";

interface BookingCalendarProps {
  serviceId: number;
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

export default function BookingCalendar({
  serviceId,
  selectedDate,
  onSelect,
}: BookingCalendarProps) {
  const {
    currentMonth,
    days,
    nextMonth,
    previousMonth,
  } = useCalendar();

  const {
    data: availableDays = [],
    isLoading,
  } = useAvailableDays(
    serviceId,
    currentMonth.getMonth() + 1,
    currentMonth.getFullYear()
  );

  const availableDates = new Set(availableDays);

  const weekDays = [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb",
  ];

  return (
    <div className="mt-8 rounded-3xl border border-[#E8E1DA] bg-white p-8">
      <div className="mb-8 flex items-center justify-between font-sans">
        <button
          onClick={previousMonth}
          className="rounded-lg p-2 transition text-black hover:bg-[#F7F2EE] cursor-pointer"
        >
          <ChevronLeft size={20} />
        </button>

        <h2 className="font-semibold capitalize text-[#2A201A]">
          {format(currentMonth, "MMMM yyyy", {
            locale: ptBR,
          })}
        </h2>

        <button
          onClick={nextMonth}
          className="rounded-lg p-2 transition text-black hover:bg-[#F7F2EE] cursor-pointer"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="mb-5 grid grid-cols-7">
        {weekDays.map((day) => (
          <div
            key={day}
            className="pb-2 text-center text-xs text-[#7E6D61] font-sans sm:pb-4 sm:text-sm"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 sm:gap-y-3 font-sans">
        {days.map((day) => {
          const dayKey = format(day, "yyyy-MM-dd");

          const isPast =
            isBefore(day, new Date()) &&
            !isSameDay(day, new Date());

          const disabled =
            !isSameMonth(day, currentMonth) ||
            isPast ||
            (!isLoading &&
              !availableDates.has(dayKey));

          const selected =
            selectedDate &&
            isSameDay(day, selectedDate);

          return (
            <button
              key={dayKey}
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={`
                mx-auto
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                text-sm
                transition-all
                duration-200

                ${
                  selected
                    ? "bg-[#3A1C12] text-white"
                    : ""
                }

                ${
                  !selected &&
                  !disabled &&
                  "text-[#2A201A] hover:bg-[#F3E8DE]"
                }

                ${
                  disabled &&
                  "cursor-not-allowed text-[#D8CCC2]"
                }
              `}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}