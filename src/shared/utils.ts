export function postMsg(action: string, payload?: unknown) {
  globalThis.parent.postMessage(
    {
      action,
      payload,
    },
    "*"
  );
}
