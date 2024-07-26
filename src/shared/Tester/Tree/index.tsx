import {
  ChevronRight,
  CircleCheckBig,
  CircleDot,
  CircleMinus,
  CircleX,
  Dot,
  Play,
  Rewind,
} from "lucide-react";
import { FC, useMemo, useState } from "react";
import ReactJson from "react-json-view";

import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

import { TestState, TreeDataItem } from "../hooks";

type TreeProps = {
  nodes: TreeDataItem[];
  isRoot?: boolean;
  testStatus?: TestState[];
  testActionDisabled?: boolean;
  size?: "l" | "m" | "s";
  onRunTest?: (id: string) => void;
  onStopTest?: (id: string) => void;
  onRunTestGroup?: (id: string) => void;
};

type TreeNodeProps = Omit<TreeProps, "nodes"> & {
  node: TreeDataItem;
};

const Tree: FC<TreeProps> = ({
  nodes,
  isRoot,
  testStatus,
  testActionDisabled,
  size,
  onRunTest,
  onStopTest,
  onRunTestGroup,
}) => {
  return (
    <ul className={`${!isRoot ? "ml-4" : ""} ${size === "s" && "max-w-64"}`}>
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          testStatus={testStatus}
          testActionDisabled={testActionDisabled}
          size={size}
          onRunTest={onRunTest}
          onStopTest={onStopTest}
          onRunTestGroup={onRunTestGroup}
        />
      ))}
    </ul>
  );
};

const TreeNode: FC<TreeNodeProps> = ({
  node,
  testStatus,
  testActionDisabled,
  size,
  onRunTest,
  onStopTest,
  onRunTestGroup,
}) => {
  const [expanded, setExpanded] = useState(node.name !== "off");

  const status = useMemo(
    () => testStatus?.find((s) => s.id === node.id),
    [testStatus, node.id]
  );

  return (
    <li>
      <div className="flex items-center h-6 p-1 mt-1 mb-1 bg-gray-100 rounded-sm select-none hover:bg-gray-200">
        <div className="shrink-0">
          {node.children && node.children.length > 0 ? (
            <ChevronRight
              size={16}
              className={`${expanded ? "rotate-90" : ""} mr-1 cursor-pointer`}
              onClick={() => setExpanded(!expanded)}
            />
          ) : (
            <Dot size={16} />
          )}
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex-1 w-0 overflow-hidden text-ellipsis">
            {node.name}
          </div>
          <div className="flex items-center gap-1">
            {status?.result !== undefined && (
              <div className="text-xs text-gray-500">
                {typeof status?.result === "string" &&
                status?.result?.startsWith("data:image") ? (
                  <Popover>
                    <PopoverTrigger className="underline">Image</PopoverTrigger>
                    <PopoverContent
                      collisionPadding={10}
                      align="end"
                      className={`p-2 border-white rounded-lg ${size === "s" ? "w-64 max-h-40" : "w-96 max-h-96"}`}
                    >
                      <img src={status.result} />
                    </PopoverContent>
                  </Popover>
                ) : typeof status?.result === "boolean" ? (
                  status.result.toString()
                ) : typeof status?.result === "string" ||
                  typeof status?.result === "number" ? (
                  status?.result
                ) : status?.result !== null ? (
                  <Popover>
                    <PopoverTrigger className="underline">Data</PopoverTrigger>
                    <PopoverContent
                      collisionPadding={10}
                      align="end"
                      className={`p-4 overflow-auto break-all bg-gray-100 border-8 border-white rounded-lg ${size === "s" ? "w-64 max-h-40 text-xs" : "w-96 max-h-96"}`}
                    >
                      <ReactJson
                        src={status?.result}
                        displayDataTypes={false}
                        displayObjectSize={false}
                        enableClipboard={false}
                      />
                    </PopoverContent>
                  </Popover>
                ) : (
                  status?.result
                )}
              </div>
            )}
            {!node.isGroup && status?.status === "running" && (
              <Button
                variant={"ghost"}
                className="items-center w-5 h-5 px-0 py-0"
                onClick={() => onStopTest?.(node.id)}
              >
                <CircleDot className="text-yellow-500" size={16} />
              </Button>
            )}
            {!node.isGroup && status?.status === "success" && (
              <Button
                disabled={testActionDisabled}
                variant={"ghost"}
                className="items-center w-5 h-5 px-0 py-0"
                onClick={() => onRunTest?.(node.id)}
              >
                <CircleCheckBig className="text-green-500" size={16} />
              </Button>
            )}
            {!node.isGroup && status?.status === "failure" && (
              <Button
                disabled={testActionDisabled}
                variant={"ghost"}
                className="items-center w-5 h-5 px-0 py-0"
                onClick={() => onRunTest?.(node.id)}
              >
                <CircleX className="text-red-500" size={16} />
              </Button>
            )}
            {!node.isGroup && status?.status === "skipped" && (
              <Button
                disabled={testActionDisabled}
                variant={"ghost"}
                className="items-center w-5 h-5 px-0 py-0"
                onClick={() => onRunTest?.(node.id)}
              >
                <CircleMinus className="text-gray-300" size={16} />
              </Button>
            )}
            {!node.isGroup && status?.status === undefined && (
              <Button
                disabled={testActionDisabled}
                variant={"ghost"}
                className="items-center w-5 h-5 px-0 py-0"
                onClick={() => onRunTest?.(node.id)}
              >
                <Play className="text-cyan-500" size={16} />
              </Button>
            )}
            {node.isGroup && (
              <Button
                disabled={testActionDisabled}
                variant={"ghost"}
                className="items-center w-5 h-5 px-0 py-0"
                onClick={() => onRunTestGroup?.(node.id)}
              >
                <Rewind className="rotate-180 text-cyan-500" size={16} />
              </Button>
            )}
          </div>
        </div>
      </div>
      {node.children && node.children.length > 0 && expanded && (
        <Tree
          nodes={node.children}
          testStatus={testStatus}
          testActionDisabled={testActionDisabled}
          size={size}
          onRunTest={onRunTest}
          onStopTest={onStopTest}
          onRunTestGroup={onRunTestGroup}
        />
      )}
    </li>
  );
};

export default Tree;
