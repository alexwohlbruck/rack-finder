const baseUrl = "https://overpass-api.de/api/interpreter";

export const op = async (query: string) => {
  const response = await fetch(`${baseUrl}?data=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data;
};

export const fetchBikeRacks = async (
  lat: number,
  lng: number,
  radius: number
) => {
  const query = `
    [out:json];
    node["amenity"="bicycle_parking"](around:${radius}, ${lat}, ${lng});
    out;
  `;
  return await op(query);
};
