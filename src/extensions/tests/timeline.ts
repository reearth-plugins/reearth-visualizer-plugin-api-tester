import { callMethod, fetchProperty } from "./common";

export function getTimelineTests(): [
  Record<string, () => void>,
  Record<string, () => void>,
] {
  return [
    {
      "reearth.timeline.startTime": () =>
        fetchProperty("reearth.timeline.startTime"),
      "reearth.timeline.stopTime": () =>
        fetchProperty("reearth.timeline.stopTime"),
      "reearth.timeline.currentTime": () =>
        fetchProperty("reearth.timeline.currentTime"),
      "reearth.timeline.isPlaying": () =>
        fetchProperty("reearth.timeline.isPlaying"),
      "reearth.timeline.speed": () => fetchProperty("reearth.timeline.speed"),
      "reearth.timeline.stepType": () =>
        fetchProperty("reearth.timeline.stepType"),
      "reearth.timeline.rangeType": () =>
        fetchProperty("reearth.timeline.rangeType"),
      "reearth.timeline.tick": () => callMethod("reearth.timeline.tick"),
    },
    {},
  ];
}
