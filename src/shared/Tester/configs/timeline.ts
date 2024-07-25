import { APITestConfig } from "./type";

const timelineTestConfigs: APITestConfig[] = [
  { path: "reearth.timeline.startTime" },
  { path: "reearth.timeline.currentTime" },
  { path: "reearth.timeline.stopTime" },
  { path: "reearth.timeline.isPlaying" },
  { path: "reearth.timeline.speed" },
  { path: "reearth.timeline.stepType" },
  { path: "reearth.timeline.rangeType" },
  { path: "reearth.timeline.tick" },
  { path: "reearth.timeline.play" },
  { path: "reearth.timeline.pause" },
  { path: "reearth.timeline.setTime" },
  { path: "reearth.timeline.setSpeed" },
  { path: "reearth.timeline.setStepType" },
  { path: "reearth.timeline.setRangeType" },
  { path: "reearth.timeline.on.tick" },
  { path: "reearth.timeline.on.commit" },
  { path: "reearth.timeline.off.tick" },
  { path: "reearth.timeline.off.commit" },
];

export default timelineTestConfigs;
