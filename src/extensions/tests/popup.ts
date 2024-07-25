import { getGlobal, randomString } from "./utils";

function handlePopupClose() {
  const { reearth } = getGlobal();
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.popup.show",
      status: "success",
      action: "userActionDone",
    },
  });
}

function showPopup(
  popup?: string,
  type?: "widget" | "infoboxBlock" | "storyBlock"
) {
  const { reearth } = getGlobal();
  reearth.popup.show(popup ?? "", {
    position: type !== "infoboxBlock" ? "right-start" : "left-start",
  });
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.popup.show",
      status: "userAction",
      checkInfo: "Is the popup shown?",
    },
  });
  reearth.popup.on("close", handlePopupClose, { once: true });
}

function handlePostMessagePopup() {
  const { reearth } = getGlobal();
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.popup.postMessage",
      status: "success",
      action: "userActionDone",
    },
  });
}

function postMessagePopup(
  popup?: string,
  type?: "widget" | "infoboxBlock" | "storyBlock"
) {
  const { reearth } = getGlobal();
  const text = randomString();
  reearth.popup.show(popup ?? "", {
    position: type !== "infoboxBlock" ? "right-start" : "left-start",
  });
  reearth.popup.postMessage({
    action: "postMessage",
    payload: {
      text,
    },
  });
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.popup.postMessage",
      status: "userAction",
      checkInfo: `Is the popup shown with post message ${text}?`,
    },
  });
}

export function getPopupTests(
  popup?: string,
  type?: "widget" | "infoboxBlock" | "storyBlock"
): [Record<string, () => void>, Record<string, () => void>] {
  const { reearth } = getGlobal();
  reearth.extension.on("message", (message: unknown) => {
    const msg = message as { action: string; payload?: unknown };
    if (msg.action === "closePopup") {
      reearth.popup.close();
    } else if (msg.action === "handlePostMessagePopup") {
      handlePostMessagePopup();
    }
  });

  return [
    {
      "reearth.popup.show": () => showPopup(popup, type),
      "reearth.popup.postMessage": () => postMessagePopup(popup, type),
    },
    {},
  ];
}
