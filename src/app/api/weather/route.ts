// import { WeatherResponse } from '@/types/weather';
import { WEATHER_RESPONSE } from "@/mock-data/weather";
// import { getEndpointUrl } from "./utils";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const location = url.searchParams.get("location");

  if (!location) {
    return new Response(
      JSON.stringify({ error: "Missing location parameter" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // try {
  //   const response = await fetch(getEndpointUrl(location));
    
  //   if (!response.ok) {
  //     throw new Error(`Weather API error: ${response.statusText}`);
  //   }

  //   const data = await response.json();
  //   return new Response(JSON.stringify(data), {
  //     status: 200,
  //     headers: { "Content-Type": "application/json" },
  //   });
  // } catch (error) {
  //   console.error(error);

  //   return new Response(
  //     JSON.stringify({ error: "Failed to fetch weather data" }),
  //     {
  //       status: 500,
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // }

  return new Response(JSON.stringify(WEATHER_RESPONSE), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}