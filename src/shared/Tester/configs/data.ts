import { APITestConfig } from "./type";

const dataTestConfigs: APITestConfig[] = [
  { path: "reearth.data.clientStorage.getAsync" },
  { path: "reearth.data.clientStorage.setAsync" },
  { path: "reearth.data.clientStorage.deleteAsync" },
  { path: "reearth.data.clientStorage.keysAsync" },
  { path: "reearth.data.clientStorage.dropStoreAsync" },
];

export default dataTestConfigs;
