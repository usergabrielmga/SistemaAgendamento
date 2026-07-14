"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { addWeeks, subWeeks } from "date-fns";
import {
  formatHeaderDate,
  isAppointmentDay,
  isSelectedDay,
} from "@/app/components/dashboard/agenda/calendar";

interface WeekDay {
  date: Date;
  dayNumber: string;
  weekDay: string;
}

interface Appointment {
  date: string;
}

interface Props {
  week: WeekDay[];
  selectedDate: Date;
  appointments: Appointment[];
  setSelectedDate: (date: Date) => void;
}

export default function AgendaCalendar({
  week,
  appointments,
  selectedDate,
  setSelectedDate,
}: Props) {
  function previousWeek() {
    setSelectedDate(subWeeks(selectedDate, 1));
  }

  function nextWeek() {
    setSelectedDate(addWeeks(selectedDate, 1));
  }

  return (
    <section className="space-y-8">

      <h1 className="text-3xl font-bold text-black">
        Agenda
      </h1>

     <div className="bg-white rounded-3xl border p-3 sm:p-4 md:p-6">
        <div className="flex items-center">

          <button
            onClick={previousWeek}
            className="flex-shrink-0 p-1 sm:p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex-1 overflow-x-auto px-2">
            <div className="flex justify-between gap-2 md:gap-3">

              {week.map((day) => {
                const total = appointments.filter((appointment) =>
                  isAppointmentDay(appointment.date, day.date)
                ).length;

                const active = isSelectedDay(day.date, selectedDate);

                return (
                  <button
                    key={day.date.toISOString()}
                    onClick={() => setSelectedDate(day.date)}
                    className={`
                      flex-shrink-0

                      w-14 h-18
                      sm:w-16 sm:h-20
                      md:w-24 md:h-24

                      rounded-2xl
                      border
                      flex flex-col
                      justify-center
                      items-center
                      transition

                      ${
                        active
                          ? "bg-[#4D2615] text-white border-[#4D2615]"
                          : "hover:bg-[#F8F6F2] border-transparent"
                      }
                    `}
                  >
                    <span
                      className={`
                        text-[9px]
                        sm:text-[10px]
                        md:text-xs
                        capitalize
                        ${
                          active
                            ? "text-white"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {day.weekDay}
                    </span>

                    <span className="font-bold text-base sm:text-lg md:text-xl">
                      {day.dayNumber}
                    </span>

                    <div
                      className={`
                        mt-1
                        w-4 h-4
                        sm:w-5 sm:h-5
                        md:w-6 md:h-6

                        rounded-full
                        flex
                        items-center
                        justify-center

                        text-[9px]
                        md:text-xs

                        ${
                          active
                            ? "bg-white/20"
                            : "bg-[#F8E5DE] text-[#B86A4A]"
                        }
                      `}
                    >
                      {total}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={nextWeek}
            className="flex-shrink-0 p-1 sm:p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight size={20} />
          </button>

        </div>
      </div>

      <h2 className="text-center font-bold text-xl">
        {formatHeaderDate(selectedDate)}
      </h2>

    </section>
  );
}