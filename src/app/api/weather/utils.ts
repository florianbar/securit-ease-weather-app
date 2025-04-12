import { format, subDays, addDays } from "date-fns";

export function getEndpointUrl(location: string): string {
  const baseUrl = process.env.WEATHER_BASE_URL;

  const startDate = format(subDays(new Date(), 3), "yyyy-MM-dd");
  const endDate = format(addDays(new Date(), 3), "yyyy-MM-dd");

  const params = new URLSearchParams({
    key: process.env.WEATHER_API_KEY || "",
    include: "days,current",
    unitGroup: "metric",
  });

  const url = `${baseUrl}/${location}/${startDate}/${endDate}?${params}`;
  return url;
}
