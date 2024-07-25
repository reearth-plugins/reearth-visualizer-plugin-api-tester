import cameraTestConfigs from "./camera";
import dataTestConfigs from "./data";
import engineTestConfigs from "./engine";
import extensionTestConfigs from "./extension";
import layersTestConfigs from "./layers";
import modalTestConfigs from "./modal";
import popupTestConfigs from "./popup";
import sketchTestConfigs from "./sketch";
import timelineTestConfigs from "./timeline";
import { APITestConfig } from "./type";
import uiTestConfigs from "./ui";
import viewerTestConfigs from "./viewer";

const apiTestConfigs: APITestConfig[] = [
  {
    path: "reearth.version",
  },
  {
    path: "reearth.apiVersion",
  },
  ...engineTestConfigs,
  ...viewerTestConfigs,
  ...cameraTestConfigs,
  ...timelineTestConfigs,
  ...sketchTestConfigs,
  ...layersTestConfigs,
  ...uiTestConfigs,
  ...modalTestConfigs,
  ...popupTestConfigs,
  ...extensionTestConfigs,
  ...dataTestConfigs,
];

export default apiTestConfigs;
