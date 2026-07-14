export interface WorkingHour {
  id_working_hour: number;
  day_of_week: number;
  is_active: boolean;
  start_time: string | null;
  end_time: string | null;
}

export type UpdateWorkingHours = Omit<
  WorkingHour,
  "id_working_hour"
>[];