import { WeatherResponseDay } from "@/types/weather";

export interface FormProps {
  disabled?: boolean;
  onSubmit: (location: string) => void;
}

export interface DaysProps {
  items: WeatherResponseDay[];
  selectedDay: WeatherResponseDay | null;
  onSelect: (datetime: string) => void;
}

export interface SelectedDayProps {
  day: WeatherResponseDay;
}