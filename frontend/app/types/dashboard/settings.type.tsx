export interface WorkingDay {
  id: number;
  label: string;
  enabled: boolean;
}

export interface WorkingHours {
  opening: string;
  closing: string;
}

export interface BlockedDate {
  id_block: number;
  block_date: string;
  start_time: string | null;
  end_time: string | null;
  reason: string;
}

export interface CreateBlockedDate {
  block_date: string;
  start_time: string | null;
  end_time: string | null;
  reason: string;
}