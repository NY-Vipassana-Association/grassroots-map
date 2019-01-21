import nycBoroughsJSON from "./nycBoroughs.json";

import {
  IBoroughFeatureCollection,
  IRegionFeatureCollection
} from "../../types";

const nycBoroughs = (nycBoroughsJSON as unknown) as IBoroughFeatureCollection;

const nycBoroughsToRegions = (
  nycBoroughData: IBoroughFeatureCollection
): IRegionFeatureCollection => {
  return {
    ...nycBoroughData,
    features: nycBoroughData.features.map(boroughFeature => {
      return {
        ...boroughFeature,
        properties: {
          name: boroughFeature.properties.borough
        }
      };
    })
  };
};

export default nycBoroughsToRegions(nycBoroughs);
