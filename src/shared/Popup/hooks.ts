import { useCallback, useLayoutEffect, useState } from "react";

import { postMsg } from "../utils";

export default () => {
  const handlePopupClose = useCallback(() => {
    postMsg("closePopup");
  }, []);

  const handlePopupPostMessageClose = useCallback(() => {
    postMsg("handlePostMessagePopup");
    postMsg("closePopup");
  }, []);

  const [msg, setMsg] = useState<string | undefined>();

  useLayoutEffect(() => {
    return window.addEventListener("message", (e) => {
      if (e?.data.action === "postMessage") {
        setMsg(e?.data.payload.text);
      }
    });
  }, []);

  return { msg, handlePopupClose, handlePopupPostMessageClose };
};
