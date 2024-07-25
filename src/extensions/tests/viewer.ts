/* eslint-disable @typescript-eslint/no-explicit-any */
import { SelectionModeEventType, ViewerEventType } from "@/shared/reearthTypes";

import { callMethod, fetchProperty } from "./common";
import { getGlobal, goto3dtiles } from "./utils";

function overrideProperty() {
  const { reearth } = getGlobal();
  reearth.camera.flyTo(
    {
      lat: 35.1518351540856,
      lng: -82.50000000000001,
      height: 16735640.865952782,
      heading: 6.283185307179586,
      pitch: -1.569218664619823,
      roll: 0,
    },
    { duration: 0 }
  );
  reearth.viewer.overrideProperty({
    scene: {
      backgroundColor: "#FF9900",
    },
    sky: {
      skyBox: {
        show: false,
      },
    },
  });
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.viewer.overrideProperty",
      status: "userCheck",
      checkInfo: "Is the background color updated to orange?",
    },
  });
}

function overridePropertyReset() {
  const { reearth } = getGlobal();
  reearth.viewer.overrideProperty({
    scene: {
      backgroundColor: undefined,
    },
    sky: {
      skyBox: {
        show: true,
      },
    },
  });
  reearth.ui.postMessage({
    action: "resetDone",
    payload: {
      id: "reearth.viewer.overrideProperty",
    },
  });
}

function overrideInteractionMode() {
  const { reearth } = getGlobal();
  reearth.viewer.interactionMode.override?.("selection");
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.viewer.interactionMode.override",
      status: "userCheck",
      checkInfo: "Is the interaction mode set to selection?",
    },
  });
}

function overrideInteractionModeReset() {
  const { reearth } = getGlobal();
  reearth.viewer.interactionMode.override?.("default");
  reearth.ui.postMessage({
    action: "resetDone",
    payload: {
      id: "reearth.viewer.interactionMode.override",
    },
  });
}

function handleViewerEvent(id: string, e: any) {
  const { reearth } = getGlobal();
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id,
      status: "success",
      action: "userActionDone",
      result: e,
    },
  });
}

function onViewerEvent(id: string) {
  const { reearth } = getGlobal();
  const eventName = id.split(".").pop() as keyof ViewerEventType;
  reearth.viewer.on(eventName, (e) => handleViewerEvent(id, e), { once: true });
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id,
      status: "userAction",
      checkInfo: `Please do ${eventName} on viewer, is it working?`,
    },
  });
}

function onMouseEnterOrLeaveEvent(id: string) {
  goto3dtiles();
  onViewerEvent(id);
}

let selectionModeEventActive = "";

function handleSelectionEvent(id: string, e: any) {
  if (selectionModeEventActive !== id) return;
  selectionModeEventActive = "";
  const { reearth } = getGlobal();
  reearth.viewer.interactionMode.override?.("default");
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id,
      status: "success",
      action: "userActionDone",
      result: e,
    },
  });
}

function onSelectionEvent(id: string) {
  const { reearth } = getGlobal();
  reearth.viewer.interactionMode.override?.("selection");
  selectionModeEventActive = id;
  const eventName = id.split(".").pop() as keyof SelectionModeEventType;
  reearth.viewer.interactionMode.selectionMode.on(
    eventName,
    (e) => handleSelectionEvent(id, e),
    { once: true }
  );
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id,
      status: "userAction",
      checkInfo: `Please do ${eventName} on viewer, is it working?`,
    },
  });
}

export function getViewerTests(): [
  Record<string, () => void>,
  Record<string, () => void>,
] {
  return [
    {
      "reearth.viewer.property": () => fetchProperty("reearth.viewer.property"),
      "reearth.viewer.overrideProperty": overrideProperty,
      "reearth.viewer.viewport": () => fetchProperty("reearth.viewer.viewport"),
      "reearth.viewer.capture": () => callMethod("reearth.viewer.capture"),
      "reearth.viewer.interactionMode.mode": () =>
        fetchProperty("reearth.viewer.interactionMode.mode"),
      "reearth.viewer.interactionMode.override": () =>
        overrideInteractionMode(),
      "reearth.viewer.env.inEditor": () =>
        fetchProperty("reearth.viewer.env.inEditor"),
      "reearth.viewer.env.isBuilt": () =>
        fetchProperty("reearth.viewer.env.isBuilt"),
      "reearth.viewer.on.click": () => onViewerEvent("reearth.viewer.on.click"),
      "reearth.viewer.on.doubleClick": () =>
        onViewerEvent("reearth.viewer.on.doubleClick"),
      "reearth.viewer.on.mouseDown": () =>
        onViewerEvent("reearth.viewer.on.mouseDown"),
      "reearth.viewer.on.mouseUp": () =>
        onViewerEvent("reearth.viewer.on.mouseUp"),
      "reearth.viewer.on.rightClick": () =>
        onViewerEvent("reearth.viewer.on.rightClick"),
      "reearth.viewer.on.rightDown": () =>
        onViewerEvent("reearth.viewer.on.rightDown"),
      "reearth.viewer.on.rightUp": () =>
        onViewerEvent("reearth.viewer.on.rightUp"),
      "reearth.viewer.on.middleClick": () =>
        onViewerEvent("reearth.viewer.on.middleClick"),
      "reearth.viewer.on.middleDown": () =>
        onViewerEvent("reearth.viewer.on.middleDown"),
      "reearth.viewer.on.middleUp": () =>
        onViewerEvent("reearth.viewer.on.middleUp"),
      "reearth.viewer.on.mouseMove": () =>
        onViewerEvent("reearth.viewer.on.mouseMove"),
      "reearth.viewer.on.mouseEnter": () =>
        onMouseEnterOrLeaveEvent("reearth.viewer.on.mouseEnter"),
      "reearth.viewer.on.mouseLeave": () =>
        onMouseEnterOrLeaveEvent("reearth.viewer.on.mouseLeave"),
      "reearth.viewer.on.wheel": () => onViewerEvent("reearth.viewer.on.wheel"),
      "reearth.viewer.on.resize": () =>
        onViewerEvent("reearth.viewer.on.resize"),
      "reearth.viewer.interactionMode.selectionMode.on.marqueeStart": () =>
        onSelectionEvent(
          "reearth.viewer.interactionMode.selectionMode.on.marqueeStart"
        ),
      "reearth.viewer.interactionMode.selectionMode.on.marqueeMove": () =>
        onSelectionEvent(
          "reearth.viewer.interactionMode.selectionMode.on.marqueeMove"
        ),
      "reearth.viewer.interactionMode.selectionMode.on.marqueeEnd": () =>
        onSelectionEvent(
          "reearth.viewer.interactionMode.selectionMode.on.marqueeEnd"
        ),
    },
    {
      "reearth.viewer.overrideProperty": overridePropertyReset,
      "reearth.viewer.interactionMode.override": overrideInteractionModeReset,
    },
  ];
}
