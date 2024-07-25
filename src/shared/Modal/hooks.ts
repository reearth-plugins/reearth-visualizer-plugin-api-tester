import { useCallback, useLayoutEffect, useState } from "react";

import { postMsg } from "../utils";

export default () => {
  const handleModalClose = useCallback(() => {
    console.log("ppp");
    postMsg("closeModal");
  }, []);

  const handleModalPostMessageClose = useCallback(() => {
    postMsg("handlePostMessageModal");
    postMsg("closeModal");
  }, []);

  const [msg, setMsg] = useState<string | undefined>();

  useLayoutEffect(() => {
    return window.addEventListener("message", (e) => {
      if (e?.data.action === "postMessage") {
        setMsg(e?.data.payload.text);
      }
    });
  }, []);

  return { msg, handleModalClose, handleModalPostMessageClose };
};
