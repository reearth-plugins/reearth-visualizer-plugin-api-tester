import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { postMsg } from "../utils";

import apiTestConfigs from "./configs";
import { APITestConfig } from "./configs/type";

import { ExtensionType } from ".";

type TreeNode = Omit<TreeDataItem, "children"> & {
  children: Record<string, TreeNode>;
};

export type TreeDataItem = {
  id: string;
  name: string;
  isGroup?: boolean;
  children?: TreeDataItem[];
};

export type TestState = {
  id: string;
  status:
    | "running"
    | "success"
    | "failure"
    | "skipped"
    | "userCheck"
    | "userAction"
    | "userActionResult"
    | undefined;
  result: unknown;
  action?: "userActionDone";
  checkInfo?: string;
};

export default ({ type }: { type: ExtensionType }) => {
  const [testStatus, setTestStatus] = useState<TestState[]>([]);
  const treeData = useMemo(() => convertToTree(apiTestConfigs), []);
  const flattenTreeData = useMemo(() => flattenTree(treeData), [treeData]);

  const [taskQueue, setTaskQueue] = useState<string[]>([]);
  const [isRunningTaskQueue, setIsRunningTaskQueue] = useState(false);

  // once at a time since tests could be conflicting
  const [runningTestId, setRunningTestId] = useState<string | undefined>();

  const handleRunTest = useCallback((id: string) => {
    setTestStatus((prev) => [
      ...prev.filter((s) => s.id !== id),
      { id, status: "running", result: undefined },
    ]);
    // run test
    console.log("run test", id);
    setRunningTestId(id);
    postMsg("runTest", { id });
  }, []);

  const handleStopTest = useCallback((id: string) => {
    setTestStatus((prev) => prev.filter((s) => s.id !== id));
    setRunningTestId(undefined);
  }, []);

  const handleRunNextTest = useCallback(() => {
    if (isRunningTaskQueue) {
      const nextQueue = taskQueue.slice(1);
      setTaskQueue(nextQueue);
      if (nextQueue.length > 0) {
        handleRunTest(nextQueue[0]);
      } else {
        setIsRunningTaskQueue(false);
        setRunningTestId(undefined);
      }
    } else {
      setRunningTestId(undefined);
    }
  }, [isRunningTaskQueue, taskQueue, handleRunTest]);

  const handleTestResult = useCallback(
    (result: TestState) => {
      if (result.id !== runningTestId) return;
      if (!runningTestId) {
        if (isRunningTaskQueue) {
          setIsRunningTaskQueue(false);
          setTaskQueue([]);
        }
        return;
      }

      console.log("result", result);

      // need user check
      if (result.status === "userCheck") {
        setDialogContent(result.checkInfo);
        setHideDialogConfirm(false);
        setIsDialogOpen(true);
      } else if (result.status === "userAction") {
        setDialogContent(result.checkInfo);
        setHideDialogConfirm(true);
        setIsDialogOpen(true);
      } else {
        setTestStatus((prev) => [
          ...prev.filter((s) => s.id !== result.id),
          result,
        ]);
        if (result.action === "userActionDone") {
          setIsDialogOpen(false);
        }
        handleRunNextTest();
      }
    },
    [runningTestId, handleRunNextTest]
  );

  const handleTestResultRef = useRef(handleTestResult);
  handleTestResultRef.current = handleTestResult;

  const handleRunQueue = useCallback(() => {
    setTestStatus([]);
    const queue: string[] = [];
    flattenTreeData
      .filter((node) => !node.isGroup)
      .forEach((node) => {
        queue.push(node.id);
      });
    setTaskQueue(queue);
    if (queue.length > 0) {
      handleRunTest(queue[0]);
      setIsRunningTaskQueue(true);
    }
  }, [handleRunTest]);

  const handleStopQueue = useCallback(() => {
    if (isRunningTaskQueue) {
      if (runningTestId) {
        handleStopTest(runningTestId);
      }
      setTaskQueue([]);
      setIsRunningTaskQueue(false);
    }
  }, [runningTestId, handleStopTest]);

  const handleRunGroup = useCallback(
    (id: string) => {
      const queue: string[] = [];
      flattenTreeData
        .filter((node) => node.id.startsWith(id) && !node.isGroup)
        .forEach((node) => {
          queue.push(node.id);
        });
      setTaskQueue(queue);
      if (queue.length > 0) {
        handleRunTest(queue[0]);
        setIsRunningTaskQueue(true);
      }
    },
    [handleRunTest]
  );

  const handleResetDone = useCallback(
    ({ id }: TestState) => {
      if (id !== runningTestId) return;
      handleRunNextTest();
    },
    [runningTestId, handleRunNextTest]
  );
  const handleResetDoneRef = useRef(handleResetDone);
  handleResetDoneRef.current = handleResetDone;

  useEffect(() => {
    return window.addEventListener("message", (e) => {
      if (e?.data.action === "testResult") {
        handleTestResultRef.current?.(e?.data.payload);
      } else if (e?.data.action === "resetDone") {
        handleResetDoneRef.current?.(e?.data.payload);
      } else if (e?.data.action === "delay") {
        setTimeout(() => {
          postMsg("handleDelay", { id: e?.data.payload.id });
        }, e?.data.payload.ms);
      }
    });
  }, []);

  const [suceessCount, failureCount, pendingCount, skippedCount, totalCount] =
    useMemo(() => {
      const successCount = testStatus.filter(
        (status) => status.status === "success"
      ).length;
      const failureCount = testStatus.filter(
        (status) => status.status === "failure"
      ).length;
      const runningCount = testStatus.filter(
        (status) => status.status === "running"
      ).length;
      const skippedCount = testStatus.filter(
        (status) => status.status === "skipped"
      ).length;

      const totalCount = flattenTreeData.filter((node) => !node.isGroup).length;

      const pendingCount =
        totalCount - successCount - failureCount - skippedCount - runningCount;

      return [
        successCount,
        failureCount,
        pendingCount,
        skippedCount,
        totalCount,
      ];
    }, [testStatus, flattenTreeData]);

  // dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | undefined>();
  const [hideDialogConfirm, setHideDialogConfirm] = useState(false);
  const handleDialogConfirm = useCallback(() => {
    setIsDialogOpen(false);
    setDialogContent(undefined);
    if (runningTestId) {
      setTestStatus((prev) => [
        ...prev.filter((s) => s.id !== runningTestId),
        { id: runningTestId, status: "success", result: undefined },
      ]);
      postMsg("resetTest", { id: runningTestId });
    }
  }, [runningTestId, handleRunNextTest]);

  const handleDialogDenied = useCallback(() => {
    setIsDialogOpen(false);
    setDialogContent(undefined);
    if (runningTestId) {
      setTestStatus((prev) => [
        ...prev.filter((s) => s.id !== runningTestId),
        { id: runningTestId, status: "failure", result: undefined },
      ]);
      postMsg("resetTest", { id: runningTestId });
    }
  }, [runningTestId, handleRunNextTest]);

  const size: "s" | "m" | "l" = useMemo(
    () => (type === "infoboxBlock" ? "s" : type === "storyBlock" ? "m" : "l"),
    [type]
  );

  return {
    treeData,
    testStatus,
    suceessCount,
    failureCount,
    pendingCount,
    skippedCount,
    totalCount,
    size,
    runningTestId,
    handleRunTest,
    handleStopTest,
    handleRunGroup,
    handleRunQueue,
    handleStopQueue,
    isDialogOpen,
    dialogContent,
    hideDialogConfirm,
    setIsDialogOpen,
    handleDialogConfirm,
    handleDialogDenied,
  };
};

function convertToTree(items: APITestConfig[]): TreeDataItem[] {
  const root: Record<string, TreeNode> = {};

  items.forEach((item) => {
    const path = item.path;
    const parts = path.split(".");
    let current = root;

    parts.forEach((part, index) => {
      if (!current[part]) {
        current[part] = {
          id: parts.slice(0, index + 1).join("."),
          name: parts.slice(index, index + 1).join("."),
          isGroup: index < parts.length - 1,
          children: {},
        };
      }

      if (index === parts.length - 1) {
        current[part].id = path;
      }

      current = current[part].children;
    });
  });

  function convertChildren(obj: Record<string, TreeNode>): TreeDataItem[] {
    return Object.keys(obj).map((key) => {
      const { children, ...rest } = obj[key];
      return {
        ...rest,
        children: convertChildren(children),
      };
    });
  }

  return convertChildren(root);
}

function flattenTree(tree: TreeDataItem[]): TreeDataItem[] {
  const result: TreeDataItem[] = [];

  function traverse(node: TreeDataItem) {
    result.push({ ...node, children: undefined });
    if (node.children) {
      node.children.forEach((child) => traverse(child));
    }
  }

  tree.forEach((node) => traverse(node));
  return result;
}
