import {
  format,
  isSameDay,
  startOfWeek,
  addDays,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export function getWeekDays(date: Date) {
  const firstDay = startOfWeek(date, {
    weekStartsOn: 0,
  });

  return Array.from({ length: 7 }).map((_, index) => {
    const day = addDays(firstDay, index);

    return {
      date: day,
      dayNumber: format(day, "d"),
      weekDay: format(day, "EEE", {
        locale: ptBR,
      }),
    };
  });
}

export function isSelectedDay(
  day: Date,
  selectedDate: Date
) {
  return isSameDay(day, selectedDate);
}

export function isAppointmentDay(
  appointmentDate: string,
  day: Date
) {
  return (
    appointmentDate.slice(0, 10) ===
    format(day, "yyyy-MM-dd")
  );
}

export function formatHeaderDate(date: Date) {
  return format(
    date,
    "EEEE, d 'de' MMMM",
    {
      locale: ptBR,
    }
  );
}