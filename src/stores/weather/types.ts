import { WeatherResponseDay } from "@/types/weather";

interface StoreProperties {
  days: WeatherResponseDay[];
  selectedDay: WeatherResponseDay | null;
  loading: boolean;
  error: string | null;
}

interface StoreActions {
  actions: {
    fetchWeather: (location: string) => void;
    selectDay: (datetime: string) => void;
  };
}

export interface WeatherStoreState extends StoreProperties, StoreActions {}