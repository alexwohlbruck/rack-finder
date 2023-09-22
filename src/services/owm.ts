import config from "../config";

const { openweathermapUrl: baseUrl, openweathermapApiKey: apiKey } = config;

// We need to find if it will rain in the next 24 hours
export const getForecast = async (lat: number, lng: number) => {
  try {
    const qs = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      appid: apiKey,
      units: "metric",
      include: "hourly",
    }).toString();

    const response = await fetch(`${baseUrl}?${qs}`);
    return await response.json();
  } catch (err) {
    throw new Error(err);
  }
};
