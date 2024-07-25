import { CirclePlay } from "lucide-react";
import { FC } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ScrollArea } from "@/shared/components/ui/scroll-area";

import useHooks from "./hooks";
import Tree from "./Tree";

export type ExtensionType = "widget" | "infoboxBlock" | "storyBlock";

const Tester: FC<{ type: ExtensionType }> = ({ type }) => {
  const {
    treeData,
    testStatus,
    suceessCount,
    failureCount,
    pendingCount,
    skippedCount,
    totalCount,
    runningTestId,
    size,
    handleRunTest,
    handleStopTest,
    handleRunGroup,
    handleRunQueue,
    isDialogOpen,
    dialogContent,
    hideDialogConfirm,
    setIsDialogOpen,
    handleDialogConfirm,
    handleDialogDenied,
  } = useHooks({ type });

  return (
    <Card className="flex flex-col flex-1 w-full h-full overflow-hidden">
      <CardHeader
        className={`flex flex-row items-center justify-between ${size !== "l" ? "p-2 pb-1" : "pb-2"}`}
      >
        <div>
          <CardTitle className={`${size !== "l" && "text-sm"}`}>
            Plugin API Tester
          </CardTitle>
          <CardDescription className={`${size !== "l" && "text-xs"}`}>
            {type}
          </CardDescription>
        </div>
        <Button
          variant={"ghost"}
          className="p-2 space-y-0"
          onClick={handleRunQueue}
        >
          <CirclePlay className="text-cyan-500" size={size !== "l" ? 20 : 32} />
        </Button>
      </CardHeader>
      <CardContent
        className={`flex-1 h-0 ${size === "l" ? "p-3 pl-5" : "p-2"} pt-0`}
      >
        <ScrollArea
          className={`h-full text-gray-800 rounded-md ${size === "l" ? "pr-4 text-sm" : "text-xs"}`}
        >
          <Tree
            nodes={treeData}
            isRoot
            testStatus={testStatus}
            testActionDisabled={!!runningTestId}
            size={size}
            onRunTest={handleRunTest}
            onStopTest={handleStopTest}
            onRunTestGroup={handleRunGroup}
          />
        </ScrollArea>
      </CardContent>
      <CardFooter className={`justify-end ${size !== "l" ? "p-2 pt-0" : ""}`}>
        <div
          className={`flex justify-end gap-1 ${size !== "l" ? "text-xs pr-2" : "text-sm pr-1"}`}
        >
          <Badge className="font-normal bg-green-500">
            {suceessCount} {size === "l" && "success"}
          </Badge>
          <Badge className="font-normal bg-red-500">
            {failureCount} {size === "l" && "failure"}
          </Badge>
          <Badge className="font-normal bg-cyan-500">
            {pendingCount} {size === "l" && "pending"}
          </Badge>
          <Badge className="font-normal bg-gray-500">
            {skippedCount} {size === "l" && "skipped"}
          </Badge>
          <Badge>
            {totalCount} {size === "l" && "total"}
          </Badge>
        </div>
      </CardFooter>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="w-4/5 bg-white rounded">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm</AlertDialogTitle>
            <AlertDialogDescription>{dialogContent}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogDenied}>
              No
            </AlertDialogCancel>
            {!hideDialogConfirm && (
              <AlertDialogAction onClick={handleDialogConfirm}>
                Yes
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default Tester;
