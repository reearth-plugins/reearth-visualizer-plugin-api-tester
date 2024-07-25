import { getGlobal, randomString } from "./utils";

function getAsync() {
  const { reearth } = getGlobal();
  reearth.data.clientStorage
    .getAsync("test-key")
    .then((result) => {
      reearth.ui.postMessage({
        action: "testResult",
        payload: {
          id: "reearth.data.clientStorage.getAsync",
          status: "success",
          result: result,
        },
      });
    })
    .catch((error) => {
      reearth.ui.postMessage({
        action: "testResult",
        payload: {
          id: "reearth.data.clientStorage.getAsync",
          status: "failure",
          result: error,
        },
      });
    });
}

function setAsync() {
  const { reearth } = getGlobal();
  reearth.data.clientStorage
    .setAsync("test-key", randomString())
    .then((result) => {
      reearth.ui.postMessage({
        action: "testResult",
        payload: {
          id: "reearth.data.clientStorage.setAsync",
          status: "success",
          result: result,
        },
      });
    })
    .catch((error) => {
      reearth.ui.postMessage({
        action: "testResult",
        payload: {
          id: "reearth.data.clientStorage.setAsync",
          status: "failure",
          result: error,
        },
      });
    });
}

function deleteAsync() {
  const { reearth } = getGlobal();
  reearth.data.clientStorage
    .deleteAsync("test-key")
    .then((result) => {
      reearth.ui.postMessage({
        action: "testResult",
        payload: {
          id: "reearth.data.clientStorage.deleteAsync",
          status: "success",
          result: result,
        },
      });
    })
    .catch((error) => {
      reearth.ui.postMessage({
        action: "testResult",
        payload: {
          id: "reearth.data.clientStorage.deleteAsync",
          status: "failure",
          result: error,
        },
      });
    });
}

function keysAsync() {
  const { reearth } = getGlobal();
  reearth.data.clientStorage
    .keysAsync()
    .then((result) => {
      reearth.ui.postMessage({
        action: "testResult",
        payload: {
          id: "reearth.data.clientStorage.keysAsync",
          status: "success",
          result: result,
        },
      });
    })
    .catch((error) => {
      reearth.ui.postMessage({
        action: "testResult",
        payload: {
          id: "reearth.data.clientStorage.keysAsync",
          status: "failure",
          result: error,
        },
      });
    });
}

function dropStoreAsync() {
  const { reearth } = getGlobal();
  reearth.data.clientStorage
    .dropStoreAsync()
    .then((result) => {
      reearth.ui.postMessage({
        action: "testResult",
        payload: {
          id: "reearth.data.clientStorage.dropStoreAsync",
          status: "success",
          result: result,
        },
      });
    })
    .catch((error) => {
      reearth.ui.postMessage({
        action: "testResult",
        payload: {
          id: "reearth.data.clientStorage.dropStoreAsync",
          status: "failure",
          result: error,
        },
      });
    });
}

export function getDataTests(): [
  Record<string, () => void>,
  Record<string, () => void>,
] {
  return [
    {
      "reearth.data.clientStorage.getAsync": getAsync,
      "reearth.data.clientStorage.setAsync": setAsync,
      "reearth.data.clientStorage.deleteAsync": deleteAsync,
      "reearth.data.clientStorage.keysAsync": keysAsync,
      "reearth.data.clientStorage.dropStoreAsync": dropStoreAsync,
    },
    {},
  ];
}
