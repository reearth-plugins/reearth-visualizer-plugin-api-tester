import { fetchProperty } from "./common";

export function getBasicTests(): [
  Record<string, () => void>,
  Record<string, () => void>,
] {
  return [
    {
      "reearth.version": () => fetchProperty("reearth.version"),
      "reearth.apiVersion": () => fetchProperty("reearth.apiVersion"),
    },
    {},
  ];
}
