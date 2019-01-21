import nycBoroughsJSON from "./nycBoroughs.json";

import { IBoroughFeatureCollection } from "../../types";

const nycBoroughs = (nycBoroughsJSON as unknown) as IBoroughFeatureCollection;

const nycBoroughsToRegions = (nycBoroughData: IBoroughFeatureCollection) => {
  return {
    ...nycBoroughData,
    features: nycBoroughData.features.map(boroughFeature => {
      return {
        ...boroughFeature,
        properties: {
          ...boroughFeature.properties,
          name: boroughFeature.properties.borough,
          code: boroughFeature.properties.boroughCode
        }
      };
    })
  };
};

export default nycBoroughsToRegions(nycBoroughs);
