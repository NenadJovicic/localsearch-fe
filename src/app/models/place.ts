export enum OpeningHoursType {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

export interface WorkingHoursDto {
  start?: string;
  end?: string;
  type: OpeningHoursType;
}
export interface OpeningHoursDto {
  day: string;
  working_hours: WorkingHoursDto[];
}

export interface PlaceDto {
  name: string;
  address: string;
  opening_hours: OpeningHoursDto[];
}

export interface DisplayGroupedWorkingHours {
  days: string;
  workingHours: string;
}
