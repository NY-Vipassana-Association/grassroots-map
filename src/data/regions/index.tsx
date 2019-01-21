import nycBoroughsJSON from "./nycBoroughs.json";
import geojson from "geojson";
import nJNorthernCountiesGeojson from "./nJNorthernCountiesGeojson.json";

import { IRegionFeatureCollection } from "../../types";

type IBoroughFeatureCollection = geojson.FeatureCollection<
  geojson.GeometryObject,
  {
    borough: string;
  }
>;

type INewJerseyFeatureCollection = geojson.FeatureCollection<
  geojson.GeometryObject,
  {
    county: string;
  }
>;

const njNorthernCountiesGeojsonData = nJNorthernCountiesGeojson as INewJerseyFeatureCollection;

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

const nycBoroughs = (nycBoroughsJSON as unknown) as IBoroughFeatureCollection;

const nycRegions = nycBoroughsToRegions(nycBoroughs).features;

const northernNJRegionCollection: IRegionFeatureCollection = {
  ...njNorthernCountiesGeojsonData,
  features: njNorthernCountiesGeojsonData.features.map(boroughFeature => {
    return {
      ...boroughFeature,
      properties: {
        name: boroughFeature.properties.county
      }
    };
  })
};

export default {
  type: nycBoroughs.type,
  features: [...nycRegions, ...northernNJRegionCollection.features]
};
