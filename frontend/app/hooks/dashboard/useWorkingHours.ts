"use client";

import { useEffect, useState } from "react";

import {
  getWorkingHours,
  updateWorkingHours,
} from "../../services/dashboard/workingHours.service";

import {
  WorkingHour,
  UpdateWorkingHours,
} from "../../types/dashboard/workingHours.type";

export default function useWorkingHours() {
  const [workingHours, setWorkingHours] =
    useState<WorkingHour[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);

    try {
      const data = await getWorkingHours();

      setWorkingHours(data);
    } finally {
      setLoading(false);
    }
  }

  async function save(data: WorkingHour[]) {
    const payload: UpdateWorkingHours =
      data.map((day) => ({
        day_of_week: day.day_of_week,
        is_active: day.is_active,
        start_time: day.start_time,
        end_time: day.end_time,
      }));

    await updateWorkingHours(payload);

    await load();
  }

  return {
    workingHours,
    loading,
    save,
    reload: load,
  };
}