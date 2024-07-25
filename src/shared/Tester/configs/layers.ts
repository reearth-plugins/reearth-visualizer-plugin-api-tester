import { APITestConfig } from "./type";

const layersTestConfigs: APITestConfig[] = [
  { path: "reearth.layers.layers" },
  { path: "reearth.layers.hide" },
  { path: "reearth.layers.show" },
  { path: "reearth.layers.add" },
  { path: "reearth.layers.delete" },
  { path: "reearth.layers.override" },
  { path: "reearth.layers.overridden" },
  { path: "reearth.layers.find" },
  { path: "reearth.layers.findAll" },
  { path: "reearth.layers.findById" },
  { path: "reearth.layers.findByIds" },
  { path: "reearth.layers.findFeatureById" },
  { path: "reearth.layers.findFeaturesByIds" },
  { path: "reearth.layers.layersInViewport" },
  { path: "reearth.layers.select" },
  { path: "reearth.layers.selectFeature" },
  { path: "reearth.layers.selectFeatures" },
  { path: "reearth.layers.selected" },
  { path: "reearth.layers.selectedFeature" },
  { path: "reearth.layers.bringToFront" },
  { path: "reearth.layers.sendToBack" },
  { path: "reearth.layers.getLayersInViewport" },
  { path: "reearth.layers.getFeaturesInScreenRect" },
  { path: "reearth.layers.on.select" },
  { path: "reearth.layers.on.edit" },
  { path: "reearth.layers.on.load" },
  { path: "reearth.layers.on.visible" },
  { path: "reearth.layers.off.select" },
  { path: "reearth.layers.off.edit" },
  { path: "reearth.layers.off.load" },
  { path: "reearth.layers.off.visible" },
];

export default layersTestConfigs;