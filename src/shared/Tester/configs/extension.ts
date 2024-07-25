import { APITestConfig } from "./type";

const extensionTestConfigs: APITestConfig[] = [
  { path: "reearth.extension.list" },
  { path: "reearth.extension.postMessage" },
  { path: "reearth.extension.block" },
  { path: "reearth.extension.widget" },
  { path: "reearth.extension.on.message" },
  { path: "reearth.extension.on.extensionMessage" },
  { path: "reearth.extension.off.message" },
  { path: "reearth.extension.off.extensionMessage" },
];

export default extensionTestConfigs;
