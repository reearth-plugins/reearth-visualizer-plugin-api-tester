/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchProperty } from "./common";
import { getGlobal } from "./utils";

function handleCreateSketch(e: any) {
  const { reearth } = getGlobal();
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.sketch.on.create",
      status: "success",
      action: "userActionDone",
      result: e,
    },
  });
}

function createSketch() {
  const { reearth } = getGlobal();
  reearth.sketch.setTool?.("marker");
  reearth.sketch.on("create", handleCreateSketch, { once: true });
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.sketch.on.create",
      status: "userAction",
      checkInfo: "Please click on map to create, is it working?",
    },
  });
}

function handleSetTool() {
  const { reearth } = getGlobal();
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.sketch.setTool",
      status: "success",
      action: "userActionDone",
    },
  });
}

function setTool() {
  const { reearth } = getGlobal();
  reearth.sketch.setTool?.("marker");
  reearth.sketch.on("create", handleSetTool, { once: true });
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.sketch.setTool",
      status: "userAction",
      checkInfo: "Please click on map to create, is it working?",
    },
  });
}

export function getSketchTests(): [
  Record<string, () => void>,
  Record<string, () => void>,
] {
  return [
    {
      "reearth.sketch.tool": () =>
        fetchProperty(
          "reearth.sketch.tool",
          (tool) =>
            tool === undefined ||
            [
              "marker",
              "polyline",
              "circle",
              "rectangle",
              "polygon",
              "extrudedCircle",
              "extrudedRectangle",
              "extrudedPolygon",
            ].includes(tool)
        ),
      "reearth.sketch.setTool": setTool,
      "reearth.sketch.options": () => fetchProperty("reearth.sketch.options"),
      "reearth.sketch.on.create": createSketch,
    },
    {},
  ];
}
