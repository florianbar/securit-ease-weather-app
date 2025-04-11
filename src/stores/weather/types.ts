import { WeatherResponse } from "@/types/weather";

interface StoreProperties {
  weather: WeatherResponse | null;
  loading: boolean;
  error: string | null;
}

interface StoreActions {
  actions: {
    fetchWeather: (location: string) => void;
  };
}

export interface WeatherStoreState extends StoreProperties, StoreActions {}