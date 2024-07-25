import { GlobalThis } from "@/shared/reearthTypes";

import { getBasicTests } from "./basic";
import { getCameraTests } from "./camera";
import { getDataTests } from "./data";
import { getEngineTests } from "./engine";
import { getExtensionTests } from "./extension";
import { getLayersTests } from "./layers";
import { getModalTests } from "./modal";
import { getPopupTests } from "./popup";
import { getSketchTests } from "./sketch";
import { getTimelineTests } from "./timeline";
import { initTestLayers } from "./utils";
import { getViewerTests } from "./viewer";

export type ExtensionGlobal = GlobalThis & {
  testLayers: Record<string, string | undefined>;
};

export function addTests({
  modal,
  popup,
  type,
}: {
  modal?: string;
  popup?: string;
  type: "widget" | "infoboxBlock" | "storyBlock";
}) {
  const extensionGlobal = globalThis as unknown as ExtensionGlobal;
  const reearth = extensionGlobal.reearth;

  initTestLayers();

  const [basicTests, basicResets] = getBasicTests();
  const [engineTests, engineResets] = getEngineTests();
  const [viewerTests, viewerResets] = getViewerTests();
  const [cameraTests, cameraResets] = getCameraTests();
  const [timelineTests, timelineResets] = getTimelineTests();
  const [layersTests, layersResets] = getLayersTests();
  const [sketchTests, sketchResets] = getSketchTests();
  const [modalTests, modalResets] = getModalTests(modal);
  const [popupTests, popupResets] = getPopupTests(popup, type);
  const [extensionTests, extensionResets] = getExtensionTests();
  const [dataTests, dataResets] = getDataTests();

  const tests = {
    ...basicTests,
    ...engineTests,
    ...viewerTests,
    ...cameraTests,
    ...timelineTests,
    ...layersTests,
    ...sketchTests,
    ...modalTests,
    ...popupTests,
    ...extensionTests,
    ...dataTests,
  };

  const resets = {
    ...basicResets,
    ...engineResets,
    ...viewerResets,
    ...cameraResets,
    ...timelineResets,
    ...layersResets,
    ...sketchResets,
    ...modalResets,
    ...popupResets,
    ...extensionResets,
    ...dataResets,
  };

  reearth.extension.on("message", (message: unknown) => {
    const msg = message as { action: string; payload?: unknown };
    if (msg.action === "runTest") {
      const id = (msg.payload as { id: string }).id;
      if (Object.keys(tests).includes(id)) {
        tests[id]();
      } else {
        reearth.ui.postMessage({
          action: "testResult",
          payload: {
            id: id,
            status: "skipped",
          },
        });
      }
    } else if (msg.action === "resetTest") {
      const id = (msg.payload as { id: string }).id;
      if (Object.keys(resets).includes(id)) {
        resets[id]();
      } else {
        reearth.ui.postMessage({
          action: "resetDone",
          payload: { id },
        });
      }
    }
  });
}
