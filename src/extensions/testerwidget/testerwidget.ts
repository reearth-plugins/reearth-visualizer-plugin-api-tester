import html from "@distui/testerwidget/main/index.html?raw";
import modal from "@distui/testerwidget/modal/index.html?raw";
import popup from "@distui/testerwidget/popup/index.html?raw";

import { GlobalThis } from "@/shared/reearthTypes";

import { addTests } from "../tests";

const reearth = (globalThis as unknown as GlobalThis).reearth;
reearth.ui.show(html);

addTests({ modal, popup, type: "widget" });
