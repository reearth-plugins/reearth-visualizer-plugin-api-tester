/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGlobal } from "./utils";

type ReearthKV = Record<string, any>;

export function fetchProperty(id: string, validate?: (value: any) => boolean) {
  const { reearth } = getGlobal();
  const paths = id.split(".");
  let result;
  try {
    result = paths
      .slice(1)
      .reduce((acc, path) => acc[path], reearth as ReearthKV);
  } catch (error) {
    console.error(error);
  }

  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id,
      status: (validate ? validate(result) : result !== undefined)
        ? "success"
        : "failure",
      result,
    },
  });
}

export function callMethod(id: string) {
  const { reearth } = getGlobal();
  const paths = id.split(".");
  let method;
  try {
    method = paths
      .slice(1)
      .reduce((acc, path) => acc[path], reearth as ReearthKV);
  } catch (error) {
    console.error(error);
  }

  const result = (method as () => any)?.();

  reearth.ui.postMessage({
    action: "testResult",
    payload: {
      id,
      status: result !== undefined ? "success" : "failure",
      result,
    },
  });
}

export function delayByUI(id: string, ms: number) {
  const { reearth } = getGlobal();
  reearth.ui.postMessage({
    action: "delay",
    payload: {
      id,
      ms,
    },
  });
}
