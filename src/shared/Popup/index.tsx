import { FC } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import useHooks from "./hooks";

const Popup: FC = () => {
  const { msg, handlePopupClose, handlePopupPostMessageClose } = useHooks();

  return (
    <Card className="flex flex-col flex-1 w-full h-auto overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Plugin API Tester</CardTitle>
          <CardDescription>Popup</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col justify-end flex-1 h-0 p-6 pt-0">
        {msg ? (
          <Button className="w-full" onClick={handlePopupPostMessageClose}>
            {`I get the message: ${msg}`}
          </Button>
        ) : (
          <Button className="w-full" onClick={handlePopupClose}>
            Yes popup is shown
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Popup;
