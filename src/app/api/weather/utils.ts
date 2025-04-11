export function getEndpointUrl(location: string): string {
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