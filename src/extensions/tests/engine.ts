import { fetchProperty } from "./common";

export function getEngineTests(): [
  Record<string, () => void>,
  Record<string, () => void>,
] {
  return [
    {
      "reearth.engine.name": () => fetchProperty("reearth.engine.name"),
    },
    {},
  ];
}
