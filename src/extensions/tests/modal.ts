import { getGlobal, randomString } from "./utils";

function handleModalClose() {
  const { reearth } = getGlobal();
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.modal.show",
      status: "success",
      action: "userActionDone",
    },
  });
}

function showModal(modal?: string) {
  const { reearth } = getGlobal();
  reearth.modal.show(modal ?? "", { background: "rgba(0, 0, 0, 0.5)" });
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.modal.show",
      status: "userAction",
      checkInfo: "Is the modal shown?",
    },
  });
  reearth.modal.on("close", handleModalClose, { once: true });
}

function handlePostMessageModal() {
  const { reearth } = getGlobal();
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.modal.postMessage",
      status: "success",
      action: "userActionDone",
    },
  });
}

function postMessageModal(modal?: string) {
  const { reearth } = getGlobal();
  const text = randomString();
  reearth.modal.show(modal ?? "", { background: "rgba(0, 0, 0, 0.5)" });
  reearth.modal.postMessage({
    action: "postMessage",
    payload: {
      text,
    },
  });
  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id: "reearth.modal.postMessage",
      status: "userAction",
      checkInfo: `Is the modal shown with post message ${text}?`,
    },
  });
}

export function getModalTests(
  modal?: string
): [Record<string, () => void>, Record<string, () => void>] {
  const { reearth } = getGlobal();
  reearth.extension.on("message", (message: unknown) => {
    const msg = message as { action: string; payload?: unknown };
    if (msg.action === "closeModal") {
      reearth.modal.close();
    } else if (msg.action === "handlePostMessageModal") {
      handlePostMessageModal();
    }
  });

  return [
    {
      "reearth.modal.show": () => showModal(modal),
      "reearth.modal.postMessage": () => postMessageModal(modal),
    },
    {},
  ];
}
