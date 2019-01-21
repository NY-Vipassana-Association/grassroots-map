import nycBoroughsJSON from "./nycBoroughs.json";
import geojson from "geojson";
import nJNorthernCountiesGeojson from "./nJNorthernCountiesGeojson.json";

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

const nycBoroughs = (nycBoroughsJSON as unknown) as IBoroughFeatureCollection;

const nycRegions = nycBoroughs.features.map(boroughFeature => {
  return {
    ...boroughFeature,
    properties: {
      name: boroughFeature.properties.borough
    }
  };
});

const northernNJRegionFeatures = njNorthernCountiesGeojsonData.features.map(
  boroughFeature => {
    return {
      ...boroughFeature,
      properties: {
        name: "Northern New Jersey"
      }
    };
  }
);

export default {
  type: nycBoroughs.type,
  features: [...nycRegions, ...northernNJRegionFeatures]
};
