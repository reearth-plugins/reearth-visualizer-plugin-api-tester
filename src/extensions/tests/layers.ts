/* eslint-disable @typescript-eslint/no-explicit-any */
import { delayByUI, fetchProperty } from "./common";
import { getGlobal, goto3dtiles } from "./utils";

function hideLayer() {
  goto3dtiles();
  delayByUI("reearth.layers.hide", 10);
}

function delayedHideLayer() {
  const { reearth, testLayers } = getGlobal();
  reearth.layers.hide(testLayers["3dtiles"] ?? "");
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.layers.hide",
      status: "userCheck",
      checkInfo: `Is the 3dtiles layer hidden?`,
    },
  });
}

function showLayer() {
  goto3dtiles();
  delayByUI("reearth.layers.show", 10);
}

function delayedShowLayer() {
  const { reearth, testLayers } = getGlobal();
  reearth.layers.show(testLayers["3dtiles"] ?? "");
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.layers.show",
      status: "userCheck",
      checkInfo: `Is the 3dtiles layer shown?`,
    },
  });
}

function onSelect() {
  goto3dtiles();
  delayByUI("reearth.layers.on.select", 10);
}

function handleLayerSelect(e: any) {
  const { reearth } = getGlobal();
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.layers.on.select",
      status: "success",
      action: "userActionDone",
      result: e,
    },
  });
}

function delayedOnSelect() {
  const { reearth } = getGlobal();
  reearth.layers.on("select", (e) => handleLayerSelect(e), { once: true });
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.layers.on.select",
      status: "userAction",
      checkInfo: `Please select layer on viewer, is it working?`,
    },
  });
}

export function getLayersTests(): [
  Record<string, () => void>,
  Record<string, () => void>,
] {
  const { reearth } = getGlobal();
  reearth.extension.on("message", (message: unknown) => {
    const msg = message as { action: string; payload?: any };
    if (msg.action === "handleDelay") {
      if (msg.payload?.id === "reearth.layers.hide") {
        delayedHideLayer();
      } else if (msg.payload?.id === "reearth.layers.show") {
        delayedShowLayer();
      } else if (msg.payload?.id === "reearth.layers.on.select") {
        delayedOnSelect();
      }
    }
  });

  return [
    {
      "reearth.layers.layers": () => fetchProperty("reearth.layers.layers"),
      "reearth.layers.hide": hideLayer,
      "reearth.layers.show": showLayer,
      "reearth.layers.selected": () =>
        fetchProperty("reearth.layers.selected", () => true),
      "reearth.layers.selectedFeature": () =>
        fetchProperty("reearth.layers.selectedFeature", () => true),
      "reearth.layers.on.select": onSelect,
    },
    {},
  ];
}
