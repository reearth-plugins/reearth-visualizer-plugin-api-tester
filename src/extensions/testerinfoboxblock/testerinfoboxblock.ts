import html from "@distui/testerinfoboxblock/main/index.html?raw";
import modal from "@distui/testerinfoboxblock/modal/index.html?raw";
import popup from "@distui/testerinfoboxblock/popup/index.html?raw";

import { GlobalThis } from "@/shared/reearthTypes";

import { addTests } from "../tests";

const reearth = (globalThis as unknown as GlobalThis).reearth;
reearth.ui.show(html);

addTests({ modal, popup, type: "infoboxBlock" });
