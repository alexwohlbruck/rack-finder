import { haversine } from "../util";
import type { Rack } from "../types/Rack";
import type { Position } from "../types/Geolocation";
import * as Comlink from "comlink";

const computeDistances = (racks: Rack[], center: Position) => {
  console.log("WEB WORKER");
  return Object.values(racks)
    .map((rack) => {
      const distance = haversine(center, rack);
      return { ...rack, distance };
    })
    .sort((a, b) => a.distance - b.distance);
};

Comlink.expose({ computeDistances });
