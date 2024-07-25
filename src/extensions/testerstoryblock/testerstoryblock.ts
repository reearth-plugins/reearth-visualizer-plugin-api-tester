import html from "@distui/testerstoryblock/main/index.html?raw";
import modal from "@distui/testerstoryblock/modal/index.html?raw";
import popup from "@distui/testerstoryblock/popup/index.html?raw";

import { GlobalThis } from "@/shared/reearthTypes";

import { addTests } from "../tests";

const reearth = (globalThis as unknown as GlobalThis).reearth;
reearth.ui.show(html);

addTests({ modal, popup, type: "storyBlock" });
