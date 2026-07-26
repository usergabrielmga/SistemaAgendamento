"use client";

import { useState } from "react";

import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const calendarStart = startOfWeek(monthStart, {
    weekStartsOn: 0,
  });

  const calendarEnd = endOfWeek(monthEnd, {
    weekStartsOn: 0,
  });

  const days = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  function nextMonth() {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  function previousMonth() {
    setCurrentMonth(subMonths(currentMonth, 1));
  }

  return {
    currentMonth,
    days,
    nextMonth,
    previousMonth,
  };
}