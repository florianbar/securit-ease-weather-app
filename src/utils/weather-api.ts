import { WeatherResponse } from '@/types/weather';
// import { WEATHER_RESPONSE } from "@/mock-data/weather";

function getEndpointUrl (location: string): string {
  const baseUrl = process.env.WEATHER_BASE_URL;

  const startDate = "2025-04-08";
  const endDate = "2025-04-14";

  const params = new URLSearchParams({
    key: process.env.WEATHER_API_KEY || "",
    include: "days,current",
    unitGroup: "metric"
  });

  const url = `${baseUrl}/${location}/${startDate}/${endDate}?${params}`;
  return url;
}

export async function fetchWeather (location: string): Promise<WeatherResponse> {
  const response = await fetch(getEndpointUrl(location));

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(
      `Error: ${response.status} - ${response.statusText}. Details: ${errorDetails}`
    );
  }

  const data = await response.json();
  return data;

  // // Mock data to prevent rate limiting
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  // return WEATHER_RESPONSE;
};
