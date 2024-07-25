import { CameraPosition } from "@/shared/reearthTypes";

import { fetchProperty } from "./common";
import { getGlobal } from "./utils";

function flyTo() {
  const { reearth } = getGlobal();
  reearth.camera.flyTo(
    {
      lat: 35.64771153929514,
      lng: 139.76071811536974,
      height: 3682.5815502617274,
      heading: 6.160267357119996,
      pitch: -0.7578038553043189,
      roll: 0.000002368954007181401,
    },
    {
      duration: 1,
    }
  );
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.camera.flyTo",
      status: "userCheck",
      checkInfo: "Does camera flyTo Tokyo?",
    },
  });
}

function handleMove(e: CameraPosition) {
  const { reearth } = getGlobal();
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.camera.on.move",
      status: "success",
      action: "userActionDone",
      result: e,
    },
  });
}

function onMove() {
  const { reearth } = getGlobal();
  reearth.camera.on("move", handleMove, { once: true });
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.camera.on.move",
      status: "userAction",
      checkInfo: `Please move camera, is it working?`,
    },
  });
}

export function getCameraTests(): [
  Record<string, () => void>,
  Record<string, () => void>,
] {
  return [
    {
      "reearth.camera.position": () => fetchProperty("reearth.camera.position"),
      "reearth.camera.fov": () => fetchProperty("reearth.camera.fov"),
      "reearth.camera.aspectRatio": () =>
        fetchProperty("reearth.camera.aspectRatio"),
      "reearth.camera.viewport": () => fetchProperty("reearth.camera.viewport"),
      "reearth.camera.flyTo": flyTo,
      "reearth.camera.on.move": onMove,
    },
    {},
  ];
}
