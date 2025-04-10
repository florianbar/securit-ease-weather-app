import { WeatherResponse } from "@/types/weather-api";

export const WEATHER_RESPONSE: WeatherResponse = {
  "request": {
      "type": "City",
      "query": "Cape Town, South Africa",
      "language": "en",
      "unit": "m"
  },
  "location": {
      "name": "Cape Town",
      "country": "South Africa",
      "region": "Western Cape",
      "lat": "-33.917",
      "lon": "18.417",
      "timezone_id": "Africa/Johannesburg",
      "localtime": "2025-04-10 15:33",
      "localtime_epoch": 1744299180,
      "utc_offset": "2.0"
  },
  "current": {
      "observation_time": "01:33 PM",
      "temperature": 25,
      "weather_code": 113,
      "weather_icons": [
          "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
      ],
      "weather_descriptions": [
          "Sunny"
      ],
      "astro": {
          "sunrise": "07:05 AM",
          "sunset": "06:29 PM",
          "moonrise": "05:19 PM",
          "moonset": "04:37 AM",
          "moon_phase": "Waxing Gibbous",
          "moon_illumination": 92
      },
      "air_quality": {
          "co": "592",
          "no2": "22.755",
          "o3": "154",
          "so2": "47.73",
          "pm2_5": "60.31",
          "pm10": "61.42",
          "us-epa-index": "3",
          "gb-defra-index": "3"
      },
      "wind_speed": 12,
      "wind_degree": 186,
      "wind_dir": "S",
      "pressure": 1014,
      "precip": 0,
      "humidity": 54,
      "cloudcover": 0,
      "feelslike": 26,
      "uv_index": 4,
      "visibility": 10,
      "is_day": "yes"
  }
};
