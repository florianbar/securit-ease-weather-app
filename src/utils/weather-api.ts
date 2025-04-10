import { WEATHER_API_URLS } from '@/constants/weather-api';

import { WeatherResponse } from '@/types/weather-api';
import { WEATHER_RESPONSE } from "@/mock-data/weather-api";

export async function fetchCurrentWeather (city: string): Promise<WeatherResponse> {
  /*
  const response = await fetch(`${WEATHER_API_URLS.CURRENT}?access_key=${process.env.WEATHER_API_KEY}&query=${city}`);

  if (!response.ok) {
    throw new Error('Failed to fetch current weather data');
  }

  const data = await response.json();
  return data;
  */

  // Mock data to prevent rate limiting
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return WEATHER_RESPONSE;
};
