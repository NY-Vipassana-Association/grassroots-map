import nycBoroughsJSON from "./nycBoroughs.json";

import { IRegionFeatureCollection } from "../../types";

const nycBoroughs = (nycBoroughsJSON as unknown) as IRegionFeatureCollection;

const nycBoroughsToRegions = (nycBoroughData: IRegionFeatureCollection) => {
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
