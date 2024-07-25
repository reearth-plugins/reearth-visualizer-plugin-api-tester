import { ExtensionGlobal } from ".";

export function getGlobal() {
  return globalThis as unknown as ExtensionGlobal;
}

export function goto3dtiles() {
  const { reearth, testLayers } = getGlobal();
  if (testLayers["3dtiles"]) {
    reearth.camera.flyTo(testLayers["3dtiles"], { duration: 0 });
  }
}

const TEST_3DTILES_URL =
  "https://assets.cms.plateau.reearth.io/assets/4f/702958-5009-4d6b-a2e0-157c7e573eb2/13100_tokyo23-ku_2022_3dtiles _1_1_op_bldg_13101_chiyoda-ku_lod2_no_texture/tileset.json";

export function initTestLayers() {
  const extensionGlobal = getGlobal();
  const reearth = extensionGlobal.reearth;
  extensionGlobal.testLayers = {};

  // 3dtiles
  if (!extensionGlobal.testLayers["3dtiles"]) {
    const layerId = reearth.layers.layers.find(
      (l) => l?.data.url === TEST_3DTILES_URL
    )?.id;
    if (layerId) extensionGlobal.testLayers["3dtiles"] = layerId;
    else {
      extensionGlobal.testLayers["3dtiles"] = reearth.layers.add({
        type: "simple",
        data: {
          url: TEST_3DTILES_URL,
          type: "3dtiles",
        },
      });
    }
  }
}

export function randomString() {
  return Math.random().toString(36).substring(7);
}
