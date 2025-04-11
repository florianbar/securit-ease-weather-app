import { WeatherResponse } from '@/types/weather';

export async function fetchWeather(location: string): Promise<WeatherResponse> {
  const response = await fetch(`/api/weather?location=${location}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `Error: ${response.status} - ${response.statusText}. Details: ${errorDetails}`
    );
  }

  const data = await response.json();
  return data;
};
