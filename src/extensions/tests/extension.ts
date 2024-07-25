import { fetchProperty } from "./common";

export function getExtensionTests(): [
  Record<string, () => void>,
  Record<string, () => void>,
] {
  return [
    {
      "reearth.extension.list": () => fetchProperty("reearth.extension.list"),
      "reearth.extension.block": () =>
        fetchProperty("reearth.extension.block", () => true),
      "reearth.extension.widget": () =>
        fetchProperty("reearth.extension.widget", () => true),
    },
    {},
  ];
}
