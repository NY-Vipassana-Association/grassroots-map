import nycBoroughsJSON from "./nycBoroughs.json";
import geojson from "geojson";

import { IRegionFeatureCollection } from "../../types";

interface BoroughProperties {
  borough: string;
}

type IBoroughFeatureCollection = geojson.FeatureCollection<
  geojson.GeometryObject,
  BoroughProperties
>;

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
